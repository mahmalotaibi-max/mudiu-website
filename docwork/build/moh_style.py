#!/usr/bin/env python3
"""MOH design-system helpers for python-docx: colors, fonts, RTL/bidi,
paragraph & cell shading/borders, box builders, TOC/page-number fields."""
from docx import Document
from docx.shared import Pt, Cm, RGBColor, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml.ns import qn, nsmap
from docx.oxml import OxmlElement
from docx.enum.section import WD_SECTION
import copy

# ---------------------------------------------------------------- palette --
GREEN = "1a5c38"
GREEN_DARK = "12432a"
GREEN_TINT = "eef3ee"
GREEN_TINT2 = "dcebe1"
GOLD = "c9a84c"
GOLD_TINT = "faf3e2"
CREAM = "f5f0e8"
BROWN = "7a5c3a"
WHITE = "ffffff"
GRAY_TEXT = "4a4a4a"
GRAY_LIGHT = "e4e2dd"
GRAY_MED = "9a9a94"
RED = "a23b2e"
RED_TINT = "f7e9e6"

FONT_BODY = "Tajawal"
FONT_HEAD = "Tajawal"

# ---------------------------------------------------------------- low level

PPR_ORDER = [
    'w:pStyle', 'w:keepNext', 'w:keepLines', 'w:pageBreakBefore', 'w:framePr',
    'w:widowControl', 'w:numPr', 'w:suppressLineNumbers', 'w:pBdr', 'w:shd',
    'w:tabs', 'w:suppressAutoHyphens', 'w:kinsoku', 'w:wordWrap',
    'w:overflowPunct', 'w:topLinePunct', 'w:autoSpaceDE', 'w:autoSpaceDN',
    'w:bidi', 'w:adjustRightInd', 'w:snapToGrid', 'w:spacing', 'w:ind',
    'w:contextualSpacing', 'w:mirrorIndents', 'w:suppressOverlap', 'w:jc',
    'w:textDirection', 'w:textAlignment', 'w:textboxTightWrap', 'w:outlineLvl',
    'w:divId', 'w:cnfStyle', 'w:rPr', 'w:sectPr', 'w:pPrChange',
]

PBDR_ORDER = ['w:top', 'w:left', 'w:bottom', 'w:right', 'w:between', 'w:bar']

TCPR_ORDER = [
    'w:cnfStyle', 'w:tcW', 'w:gridSpan', 'w:hMerge', 'w:vMerge', 'w:tcBorders',
    'w:shd', 'w:noWrap', 'w:tcMar', 'w:textDirection', 'w:tcFitText',
    'w:vAlign', 'w:hideMark', 'w:headers', 'w:cellIns', 'w:cellDel',
    'w:cellMerge', 'w:tcPrChange',
]

TBLPR_ORDER = [
    'w:tblStyle', 'w:tblpPr', 'w:tblOverlap', 'w:bidiVisual',
    'w:tblStyleRowBandSize', 'w:tblStyleColBandSize', 'w:tblW', 'w:jc',
    'w:tblCellSpacing', 'w:tblInd', 'w:tblBorders', 'w:shd', 'w:tblLayout',
    'w:tblCellMar', 'w:tblLook', 'w:tblCaption', 'w:tblDescription',
    'w:tblPrChange',
]


def insert_in_order(parent, new_el, order):
    qorder = [qn(t) for t in order]
    tag = new_el.tag
    try:
        pos = qorder.index(tag)
    except ValueError:
        parent.append(new_el)
        return new_el
    before_tags = set(qorder[pos + 1:])
    for child in parent:
        if child.tag in before_tags:
            child.addprevious(new_el)
            return new_el
    parent.append(new_el)
    return new_el


def _get_or_new(parent, tag, order):
    existing = parent.find(qn(tag))
    if existing is not None:
        return existing
    e = OxmlElement(tag)
    insert_in_order(parent, e, order)
    return e


def _set(el, tag, **attrs):
    e = OxmlElement(tag)
    for k, v in attrs.items():
        e.set(qn(k), str(v))
    el.append(e)
    return e


def rtl_paragraph(p, align="right"):
    pPr = p._p.get_or_add_pPr()
    bidi = _get_or_new(pPr, 'w:bidi', PPR_ORDER)
    bidi.set(qn('w:val'), '1')
    jc = _get_or_new(pPr, 'w:jc', PPR_ORDER)
    jc.set(qn('w:val'), align)
    return p


def rtl_run(r):
    rPr = r._r.get_or_add_rPr()
    if rPr.find(qn('w:rtl')) is None:
        _set(rPr, 'w:rtl', **{'w:val': '1'})


RPR_ORDER = [
    'w:rStyle', 'w:rFonts', 'w:b', 'w:bCs', 'w:i', 'w:iCs', 'w:caps',
    'w:smallCaps', 'w:strike', 'w:dstrike', 'w:outline', 'w:shadow',
    'w:emboss', 'w:imprint', 'w:noProof', 'w:snapToGrid', 'w:vanish',
    'w:webHidden', 'w:color', 'w:spacing', 'w:w', 'w:kern', 'w:position',
    'w:sz', 'w:szCs', 'w:highlight', 'w:u', 'w:effect', 'w:bdr', 'w:shd',
    'w:fitText', 'w:vertAlign', 'w:rtl', 'w:cs', 'w:em', 'w:lang',
    'w:eastAsianLayout', 'w:specVanish', 'w:oMath',
]


def set_font(run, name=FONT_BODY, size=None, bold=None, italic=None,
             underline=None, color=None):
    run.font.name = name
    rPr = run._r.get_or_add_rPr()
    rFonts = rPr.find(qn('w:rFonts'))
    if rFonts is None:
        rFonts = OxmlElement('w:rFonts')
        rPr.append(rFonts)
    for a in ('w:ascii', 'w:hAnsi', 'w:cs', 'w:eastAsia'):
        rFonts.set(qn(a), name)
    if size is not None:
        run.font.size = Pt(size)
        # Arabic/complex-script runs are sized by szCs, not just sz —
        # without it Word/LO falls back to the style's default size.
        szCs = _get_or_new(rPr, 'w:szCs', RPR_ORDER)
        szCs.set(qn('w:val'), str(int(size * 2)))
    if bold is not None:
        run.font.bold = bold
        bCs = _get_or_new(rPr, 'w:bCs', RPR_ORDER)
        bCs.set(qn('w:val'), '1' if bold else '0')
    if italic is not None:
        run.font.italic = italic
        iCs = _get_or_new(rPr, 'w:iCs', RPR_ORDER)
        iCs.set(qn('w:val'), '1' if italic else '0')
    if underline is not None:
        run.font.underline = underline
    if color is not None:
        run.font.color.rgb = RGBColor.from_string(color)
    rtl_run(run)
    return run


def add_text(paragraph, text, **kw):
    r = paragraph.add_run(text)
    set_font(r, **kw)
    return r


def shade_paragraph(p, hex_fill):
    pPr = p._p.get_or_add_pPr()
    shd = _get_or_new(pPr, 'w:shd', PPR_ORDER)
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_fill)


def border_paragraph(p, color=GOLD, sz=8, sides=('top', 'bottom', 'left', 'right'),
                      space=8):
    pPr = p._p.get_or_add_pPr()
    pBdr = _get_or_new(pPr, 'w:pBdr', PPR_ORDER)
    for side in sides:
        tag = f'w:{side}'
        e = pBdr.find(qn(tag))
        if e is None:
            e = OxmlElement(tag)
            insert_in_order(pBdr, e, PBDR_ORDER)
        e.set(qn('w:val'), 'single')
        e.set(qn('w:sz'), str(sz))
        e.set(qn('w:space'), str(space))
        e.set(qn('w:color'), color)


def paragraph_spacing(p, before=0, after=0, line=None):
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    if line:
        pf.line_spacing = line


def paragraph_indent(p, left=None, right=None, first_line=None):
    pPr = p._p.get_or_add_pPr()
    ind = _get_or_new(pPr, 'w:ind', PPR_ORDER)
    if left is not None:
        ind.set(qn('w:right'), str(Cm(left)))  # RTL: 'right' = leading indent
    if right is not None:
        ind.set(qn('w:left'), str(Cm(right)))
    if first_line is not None:
        ind.set(qn('w:firstLine'), str(Cm(first_line)))


def keep_with_next(p, val=True):
    pPr = p._p.get_or_add_pPr()
    e = _get_or_new(pPr, 'w:keepNext', PPR_ORDER)
    e.set(qn('w:val'), '1' if val else '0')


def keep_lines(p, val=True):
    pPr = p._p.get_or_add_pPr()
    e = _get_or_new(pPr, 'w:keepLines', PPR_ORDER)
    e.set(qn('w:val'), '1' if val else '0')


def page_break_before(p, val=True):
    pPr = p._p.get_or_add_pPr()
    e = _get_or_new(pPr, 'w:pageBreakBefore', PPR_ORDER)
    e.set(qn('w:val'), '1' if val else '0')


def suppress_toc(p):
    """Mark a heading paragraph so Word's TOC field (\\o "1-4") skips it,
    by dropping its outline level while keeping the visual style."""
    pPr = p._p.get_or_add_pPr()
    old = pPr.find(qn('w:outlineLvl'))
    if old is not None:
        pPr.remove(old)


def spacer(doc, h=4):
    """A tiny empty paragraph — required as a separator between two adjacent
    tables so Word/LibreOffice never treat them as one continuous table."""
    p = doc.add_paragraph()
    paragraph_spacing(p, before=0, after=h)
    return p


def add_page_break(doc):
    p = doc.add_paragraph()
    run = p.add_run()
    br = OxmlElement('w:br')
    br.set(qn('w:type'), 'page')
    run._r.append(br)
    return p


def add_field(paragraph, instr_text, result_text=""):
    r = paragraph.add_run()
    fld_begin = OxmlElement('w:fldChar')
    fld_begin.set(qn('w:fldCharType'), 'begin')
    r._r.append(fld_begin)

    r2 = paragraph.add_run()
    instr = OxmlElement('w:instrText')
    instr.set(qn('xml:space'), 'preserve')
    instr.text = instr_text
    r2._r.append(instr)

    r3 = paragraph.add_run()
    fld_sep = OxmlElement('w:fldChar')
    fld_sep.set(qn('w:fldCharType'), 'separate')
    r3._r.append(fld_sep)

    r4 = paragraph.add_run(result_text)
    set_font(r4)

    r5 = paragraph.add_run()
    fld_end = OxmlElement('w:fldChar')
    fld_end.set(qn('w:fldCharType'), 'end')
    r5._r.append(fld_end)
    return r5


def add_page_number(paragraph, color=GRAY_TEXT, size=9, bold=False):
    add_field(paragraph, 'PAGE \\* ARABIC', "1")
    for r in paragraph.runs:
        set_font(r, size=size, color=color, bold=bold)


def add_toc(doc):
    p = doc.add_paragraph()
    add_field(p, 'TOC \\o "1-3" \\h \\z \\u', "اضغط بزر اليمين ثم “تحديث الحقل” لعرض الفهرس")
    for r in p.runs:
        set_font(r, size=11, color=GRAY_TEXT)
    return p


# ---------------------------------------------------------------- tables --

TCBORDERS_ORDER = ['w:top', 'w:start', 'w:bottom', 'w:end', 'w:insideH', 'w:insideV',
                    'w:tl2br', 'w:tr2bl', 'w:left', 'w:right']
TCMAR_ORDER = ['w:top', 'w:start', 'w:bottom', 'w:end', 'w:left', 'w:right']


def set_table_rtl(table):
    tbl = table._tbl
    tblPr = tbl.tblPr
    _get_or_new(tblPr, 'w:bidiVisual', TBLPR_ORDER)


def shade_cell(cell, hex_fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = _get_or_new(tcPr, 'w:shd', TCPR_ORDER)
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_fill)


def cell_borders(cell, color=GRAY_LIGHT, sz=4, sides=('top', 'bottom', 'start', 'end')):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = _get_or_new(tcPr, 'w:tcBorders', TCPR_ORDER)
    for side in sides:
        tag = f'w:{side}'
        e = tcBorders.find(qn(tag))
        if e is None:
            e = OxmlElement(tag)
            insert_in_order(tcBorders, e, TCBORDERS_ORDER)
        e.set(qn('w:val'), 'single')
        e.set(qn('w:sz'), str(sz))
        e.set(qn('w:color'), color)


def cell_margins(cell, top=80, bottom=80, start=120, end=120):
    tcPr = cell._tc.get_or_add_tcPr()
    mar = _get_or_new(tcPr, 'w:tcMar', TCPR_ORDER)
    for side, val in (('top', top), ('bottom', bottom), ('start', start), ('end', end)):
        tag = f'w:{side}'
        e = mar.find(qn(tag))
        if e is None:
            e = OxmlElement(tag)
            insert_in_order(mar, e, TCMAR_ORDER)
        e.set(qn('w:w'), str(val))
        e.set(qn('w:type'), 'dxa')


def cell_valign(cell, val='center'):
    tcPr = cell._tc.get_or_add_tcPr()
    va = _get_or_new(tcPr, 'w:vAlign', TCPR_ORDER)
    va.set(qn('w:val'), val)


def set_col_widths(table, widths_cm):
    table.autofit = False
    tbl = table._tbl
    tblGrid = tbl.find(qn('w:tblGrid'))
    if tblGrid is not None:
        for gc, w in zip(tblGrid.findall(qn('w:gridCol')), widths_cm):
            gc.set(qn('w:w'), str(Cm(w).twips))
    for row in table.rows:
        for cell, w in zip(row.cells, widths_cm):
            cell.width = Cm(w)
    tblPr = tbl.tblPr
    tblW = _get_or_new(tblPr, 'w:tblW', TBLPR_ORDER)
    tblW.set(qn('w:type'), 'dxa')
    tblW.set(qn('w:w'), str(Cm(sum(widths_cm)).twips))


TRPR_ORDER = [
    'w:cnfStyle', 'w:divId', 'w:gridBefore', 'w:gridAfter', 'w:wBefore',
    'w:wAfter', 'w:cantSplit', 'w:trHeight', 'w:tblHeader',
    'w:tblCellSpacing', 'w:jc', 'w:hidden', 'w:ins', 'w:del', 'w:trPrChange',
]


def row_cant_split(row):
    """Forces a table row to move to the next page as a whole instead of
    breaking mid-row — a split row leaves an orphaned, unlabeled colored
    cell fragment on the next page that reads as a color glitch."""
    trPr = row._tr.get_or_add_trPr()
    _get_or_new(trPr, 'w:cantSplit', TRPR_ORDER)


def cant_split_table(table):
    for row in table.rows:
        row_cant_split(row)


def clear_cell_text(cell):
    cell.text = ""


def write_cell(cell, text, bold=False, color=None, size=10.5, align='right',
               fill=None, font=FONT_BODY, valign='center'):
    clear_cell_text(cell)
    p = cell.paragraphs[0]
    rtl_paragraph(p, align=align)
    paragraph_spacing(p, before=2, after=2, line=1.15)
    for i, line in enumerate(str(text).split("\n")):
        if i > 0:
            p.add_run().add_break()
        add_text(p, line, name=font, size=size, bold=bold, color=color)
    if fill:
        shade_cell(cell, fill)
    cell_valign(cell, valign)
    cell_margins(cell)
    return p


def style_table_default(table, header_rows=1, col_widths=None, zebra=True,
                         header_fill=GREEN, header_color=WHITE,
                         body_size=10, align_first_col_right=True):
    set_table_rtl(table)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for ri, row in enumerate(table.rows):
        for ci, cell in enumerate(row.cells):
            txt = cell.text
            is_header = ri < header_rows
            fill = header_fill if is_header else (GREEN_TINT if (zebra and ri % 2 == 0) else WHITE)
            color = header_color if is_header else "1f1f1f"
            write_cell(cell, txt, bold=is_header, color=color, fill=fill,
                       size=(10.5 if is_header else body_size))
            cell_borders(cell, color=(GREEN if is_header else GRAY_LIGHT), sz=4)
    if col_widths:
        set_col_widths(table, col_widths)
    cant_split_table(table)


SCALE_COLORS = {
    '5': ('1a5c38', WHITE),
    '4': ('4f8a63', WHITE),
    '3': ('c9a84c', '3a2f10'),
    '2': ('c98b4c', WHITE),
    '1': ('a23b2e', WHITE),
}


def style_scale_table(table, col_widths=None):
    """سلم التقييم tables: first column holds a 1-5 grade; color-code it."""
    import re
    set_table_rtl(table)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for ri, row in enumerate(table.rows):
        cells = row.cells
        is_header = (ri == 0)
        grade_txt = cells[0].text.strip()
        if grade_txt not in SCALE_COLORS:
            m = re.search(r'[0-9]', grade_txt)
            if m and m.group(0) in SCALE_COLORS:
                grade_txt = m.group(0)
        for ci, cell in enumerate(cells):
            txt = cell.text
            if is_header:
                write_cell(cell, txt, bold=True, color=WHITE, fill=GREEN, size=10.5)
                cell_borders(cell, color=GREEN, sz=4)
                continue
            if ci == 0 and grade_txt in SCALE_COLORS:
                fill, color = SCALE_COLORS[grade_txt]
                write_cell(cell, txt, bold=True, color=color, fill=fill, size=12,
                           align='center')
            else:
                write_cell(cell, txt, bold=False, color="1f1f1f",
                           fill=(WHITE if ri % 2 else GREEN_TINT), size=10)
            cell_borders(cell, color=GRAY_LIGHT, sz=4)
    if col_widths:
        set_col_widths(table, col_widths)
    cant_split_table(table)


def add_picture_centered(doc_or_cell, path, width_cm=None):
    p = doc_or_cell.add_paragraph()
    rtl_paragraph(p, align='center')
    run = p.add_run()
    if width_cm:
        run.add_picture(path, width=Cm(width_cm))
    else:
        run.add_picture(path)
    return p


def gold_dot(doc, align='center'):
    p = doc.add_paragraph()
    rtl_paragraph(p, align=align)
    add_text(p, "●", size=11, color=GOLD, bold=False)
    return p


def hr_rule(doc, color=GOLD, sz=10):
    p = doc.add_paragraph()
    rtl_paragraph(p)
    border_paragraph(p, color=color, sz=sz, sides=('bottom',), space=4)
    paragraph_spacing(p, before=0, after=6)
    p.add_run("")
    return p
