#!/usr/bin/env python3
"""Page setup, style definitions, and design-system 'components' (boxes,
cards, process-flow diagrams) built on top of moh_style helpers."""
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from moh_style import (
    GREEN, GREEN_DARK, GREEN_TINT, GREEN_TINT2, GOLD, GOLD_TINT, CREAM, BROWN,
    WHITE, GRAY_TEXT, GRAY_LIGHT, GRAY_MED, RED, RED_TINT, FONT_BODY, FONT_HEAD,
    rtl_paragraph, rtl_run, set_font, add_text, shade_paragraph, border_paragraph,
    paragraph_spacing, paragraph_indent, keep_with_next, keep_lines,
    page_break_before, suppress_toc, add_page_break, add_page_number, add_toc,
    set_table_rtl, shade_cell, cell_borders, cell_margins, cell_valign,
    set_col_widths, write_cell, style_table_default, style_scale_table,
    add_picture_centered, gold_dot, hr_rule, spacer,
)

LOGO = "/home/user/mudiu-website/docwork/unpacked/word/media/image1.png"
BANNER = "/home/user/mudiu-website/docwork/unpacked/word/media/image2.png"

PAGE_W = Cm(21.0)
PAGE_H = Cm(29.7)
MARGIN = Cm(2.2)


# --------------------------------------------------------------- sections --

def setup_section(section, first_page=False):
    section.page_width = PAGE_W
    section.page_height = PAGE_H
    section.top_margin = Cm(2.3)
    section.bottom_margin = Cm(2.0)
    section.left_margin = MARGIN
    section.right_margin = MARGIN
    section.header_distance = Cm(1.1)
    section.footer_distance = Cm(1.0)
    from moh_style import _get_or_new
    SECTPR_ORDER = [
        'w:headerReference', 'w:footerReference', 'w:footnotePr', 'w:endnotePr',
        'w:type', 'w:pgSz', 'w:pgMar', 'w:paperSrc', 'w:pgBorders', 'w:lnNumType',
        'w:pgNumType', 'w:cols', 'w:formProt', 'w:vAlign', 'w:noEndnote',
        'w:titlePg', 'w:textDirection', 'w:bidi', 'w:rtlGutter', 'w:docGrid',
        'w:printerSettings', 'w:sectPrChange',
    ]
    sectPr = section._sectPr
    bidi = _get_or_new(sectPr, 'w:bidi', SECTPR_ORDER)
    docGrid = _get_or_new(sectPr, 'w:docGrid', SECTPR_ORDER)
    if docGrid.get(qn('w:type')) is None:
        docGrid.set(qn('w:type'), 'lines')


def build_header(section, chapter_title=""):
    header = section.header
    header.is_linked_to_previous = False
    for p in list(header.paragraphs):
        p.text = ""
    tbl = header.add_table(rows=1, cols=2, width=PAGE_W - 2 * MARGIN)
    set_table_rtl(tbl)
    tbl.autofit = False
    set_col_widths(tbl, [PAGE_W.cm - 2 * MARGIN.cm - 4.0, 4.0])
    c_title, c_logo = tbl.rows[0].cells
    p2 = c_title.paragraphs[0]
    rtl_paragraph(p2, align='right')
    add_text(p2, chapter_title, name=FONT_HEAD, size=9.5, bold=True, color=GREEN)
    cell_valign(c_title, 'center')
    cell_margins(c_title, top=20, bottom=20, start=0, end=0)

    clear_p = c_logo.paragraphs[0]
    rtl_paragraph(clear_p, align='left')
    run = clear_p.add_run()
    run.add_picture(LOGO, height=Cm(1.05))
    cell_valign(c_logo, 'center')
    cell_margins(c_logo, top=20, bottom=20, start=60, end=0)
    for row in tbl.rows:
        for cell in row.cells:
            cell_borders(cell, color=WHITE, sz=0)
    bottom_p = header.add_paragraph()
    border_paragraph(bottom_p, color=GOLD, sz=6, sides=('bottom',), space=3)
    paragraph_spacing(bottom_p, before=2, after=0)


def build_footer(section, doc_label="الدليل الإرشادي لتطبيق منهجيتي المؤشرات والمشاريع"):
    footer = section.footer
    footer.is_linked_to_previous = False
    for p in list(footer.paragraphs):
        p.text = ""
    tbl = footer.add_table(rows=1, cols=2, width=PAGE_W - 2 * MARGIN)
    set_table_rtl(tbl)
    tbl.autofit = False
    set_col_widths(tbl, [(PAGE_W.cm - 2 * MARGIN.cm) / 2] * 2)
    c_left, c_right = tbl.rows[0].cells
    p1 = c_right.paragraphs[0]
    rtl_paragraph(p1, align='right')
    add_text(p1, doc_label, name=FONT_BODY, size=8, color=GRAY_MED)
    p2 = c_left.paragraphs[0]
    rtl_paragraph(p2, align='left')
    add_page_number(p2, color=GRAY_MED, size=8.5, bold=True)
    for row in tbl.rows:
        for cell in row.cells:
            cell_borders(cell, color=WHITE, sz=0)
            cell_valign(cell, 'center')
            cell_margins(cell, top=40, bottom=0, start=0, end=0)


# --------------------------------------------------------------- styles --

def _set_style_rfonts(style, font_name):
    rpr = style.element.get_or_add_rPr()
    rFonts = rpr.find(qn('w:rFonts'))
    if rFonts is None:
        rFonts = OxmlElement('w:rFonts')
        rpr.append(rFonts)
    for a in ('w:ascii', 'w:hAnsi', 'w:cs', 'w:eastAsia'):
        rFonts.set(qn(a), font_name)


def _set_style_size_bold(style, size_pt, bold):
    from moh_style import _get_or_new, RPR_ORDER
    rpr = style.element.get_or_add_rPr()
    szCs = _get_or_new(rpr, 'w:szCs', RPR_ORDER)
    szCs.set(qn('w:val'), str(int(size_pt * 2)))
    if bold:
        bCs = _get_or_new(rpr, 'w:bCs', RPR_ORDER)
        bCs.set(qn('w:val'), '1')


def _set_style_bidi_jc(style, align):
    from moh_style import _get_or_new, PPR_ORDER
    ppr = style.element.get_or_add_pPr()
    bidi = _get_or_new(ppr, 'w:bidi', PPR_ORDER)
    bidi.set(qn('w:val'), '1')
    jc = _get_or_new(ppr, 'w:jc', PPR_ORDER)
    jc.set(qn('w:val'), align)
    return ppr


def fix_zoom(doc):
    el = doc.settings.element
    z = el.find(qn('w:zoom'))
    if z is not None and z.get(qn('w:percent')) is None:
        z.set(qn('w:percent'), '100')


SETTINGS_ORDER = [
    'w:writeProtection', 'w:view', 'w:zoom', 'w:removePersonalInformation',
    'w:removeDateAndTime', 'w:doNotDisplayPageBoundaries', 'w:displayBackgroundShape',
    'w:printPostScriptOverText', 'w:puncationKerning', 'w:proofState',
    'w:formsDesign', 'w:attachedTemplate', 'w:linkStyles', 'w:stylePaneFormatFilter',
    'w:stylePaneSortMethod', 'w:documentType', 'w:mailMerge', 'w:revisionView',
    'w:trackChanges', 'w:doNotTrackMoves', 'w:doNotTrackFormatting',
    'w:documentProtection', 'w:autoFormatOverride', 'w:styleLockTheme',
    'w:styleLockQFSet', 'w:defaultTabStop', 'w:autoHyphenation',
    'w:consecutiveHyphenLimit', 'w:hyphenationZone', 'w:doNotHyphenateCaps',
    'w:showEnvelope', 'w:summaryLength', 'w:clickAndTypeStyle',
    'w:defaultTableStyle', 'w:evenAndOddHeaders', 'w:bookFoldRevPrinting',
    'w:bookFoldPrinting', 'w:bookFoldPrintingSheets', 'w:drawingGridHorizontalSpacing',
    'w:drawingGridVerticalSpacing', 'w:displayHorizontalDrawingGridEvery',
    'w:displayVerticalDrawingGridEvery', 'w:doNotUseMarginsForDrawingGridOrigin',
    'w:drawingGridHorizontalOrigin', 'w:drawingGridVerticalOrigin',
    'w:doNotShadeFormData', 'w:noPunctuationKerning', 'w:characterSpacingControl',
    'w:printTwoOnOne', 'w:strictFirstAndLastChars', 'w:noLineBreaksAfter',
    'w:noLineBreaksBefore', 'w:savePreviewPicture', 'w:doNotValidateAgainstSchema',
    'w:saveInvalidXml', 'w:ignoreMixedContent', 'w:alwaysShowPlaceholderText',
    'w:doNotDemarcateInvalidXml', 'w:saveXmlDataOnly', 'w:useXSLTWhenSaving',
    'w:saveThroughXslt', 'w:showXMLTags', 'w:alwaysMergeEmptyNamespace',
    'w:updateFields', 'w:hdrShapeDefaults', 'w:footnotePr', 'w:endnotePr',
    'w:compat', 'w:rsids', 'w:mathPr', 'w:uiCompat97To2003', 'w:attachedSchema',
    'w:themeFontLang', 'w:clrSchemeMapping', 'w:doNotIncludeSubdocsInStats',
    'w:doNotAutoCompressPictures', 'w:forceUpgrade', 'w:captions', 'w:readModeInkLockDown',
    'w:smartTagType', 'w:schemaLibrary', 'w:shapeDefaults', 'w:doNotEmbedSmartTags',
    'w:decimalSymbol', 'w:listSeparator',
]


def force_update_fields(doc):
    """Ensures Word refreshes TOC/PAGE fields as soon as the file opens."""
    el = doc.settings.element
    from moh_style import _get_or_new
    uf = _get_or_new(el, 'w:updateFields', SETTINGS_ORDER)
    uf.set(qn('w:val'), 'true')


def setup_styles(doc):
    from moh_style import _get_or_new, PPR_ORDER, PBDR_ORDER, insert_in_order
    fix_zoom(doc)
    styles = doc.styles

    normal = styles['Normal']
    normal.font.name = FONT_BODY
    normal.font.size = Pt(11)
    normal.font.color.rgb = RGBColor.from_string("242424")
    _set_style_rfonts(normal, FONT_BODY)
    _set_style_size_bold(normal, 11, False)
    pf = normal.paragraph_format
    pf.space_after = Pt(8)
    pf.line_spacing = 1.32
    _set_style_bidi_jc(normal, 'both')

    heading_specs = {
        'Heading 1': dict(size=22, color=GREEN, bold=True, before=4, after=14,
                           border=True),
        'Heading 2': dict(size=16, color=GREEN, bold=True, before=20, after=10,
                           border=False),
        'Heading 3': dict(size=13, color=BROWN, bold=True, before=14, after=6,
                           border=False),
        'Heading 4': dict(size=11.5, color=GRAY_TEXT, bold=True, before=10, after=4,
                           border=False),
    }
    for name, spec in heading_specs.items():
        st = styles[name]
        st.font.name = FONT_HEAD
        st.font.size = Pt(spec['size'])
        st.font.bold = spec['bold']
        st.font.color.rgb = RGBColor.from_string(spec['color'])
        _set_style_rfonts(st, FONT_HEAD)
        _set_style_size_bold(st, spec['size'], spec['bold'])
        pf = st.paragraph_format
        pf.space_before = Pt(spec['before'])
        pf.space_after = Pt(spec['after'])
        pf.keep_with_next = True
        ppr = _set_style_bidi_jc(st, 'right')
        if spec['border']:
            pBdr = _get_or_new(ppr, 'w:pBdr', PPR_ORDER)
            bottom = OxmlElement('w:bottom')
            insert_in_order(pBdr, bottom, PBDR_ORDER)
            bottom.set(qn('w:val'), 'single')
            bottom.set(qn('w:sz'), '10')
            bottom.set(qn('w:space'), '6')
            bottom.set(qn('w:color'), GOLD)

    try:
        lp = styles['List Paragraph']
        lp.font.name = FONT_BODY
        lp.font.size = Pt(11)
        pf = lp.paragraph_format
        pf.space_after = Pt(5)
        pf.line_spacing = 1.28
    except KeyError:
        pass


# --------------------------------------------------------------- boxes --

def _box_open(doc, fill, border_color, sides=('top', 'bottom', 'left', 'right'),
               before=10, after=10, indent=0.15, sz=6):
    p = doc.add_paragraph()
    rtl_paragraph(p)
    shade_paragraph(p, fill)
    border_paragraph(p, color=border_color, sz=sz, sides=sides, space=10)
    paragraph_spacing(p, before=before, after=2, line=1.3)
    paragraph_indent(p, left=indent, right=indent)
    keep_lines(p)
    return p


def callout(doc, kind, title, body_lines):
    """kind in {'alert','note','rule'} -> تنبيه / ملاحظة / قاعدة تطبيقية."""
    palette = {
        'alert': (RED_TINT, RED, RED, "⚑"),
        'note': (GREEN_TINT, GREEN, GREEN, "ⓘ"),
        'rule': (GOLD_TINT, GOLD, BROWN, "◆"),
    }[kind]
    fill, border, titlecolor, icon = palette
    p1 = _box_open(doc, fill, border, before=12)
    add_text(p1, f"{icon}  {title}", name=FONT_HEAD, size=11, bold=True,
             color=titlecolor)
    for i, line in enumerate(body_lines):
        p = doc.add_paragraph()
        rtl_paragraph(p)
        shade_paragraph(p, fill)
        sides = ('left', 'right') if i < len(body_lines) - 1 else ('left', 'right', 'bottom')
        border_paragraph(p, color=border, sz=6, sides=sides, space=10)
        paragraph_spacing(p, before=0, after=(10 if i == len(body_lines) - 1 else 2),
                           line=1.3)
        paragraph_indent(p, left=0.15, right=0.15)
        add_text(p, line, name=FONT_BODY, size=10.5, color="242424")
    return p1


def principle_card(doc, text, label="قاعدة", number=None):
    p = _box_open(doc, GREEN_TINT2, GREEN, before=10, after=10, sz=8)
    tag = f"{label} {number}" if number else label
    add_text(p, f"{tag}  ", name=FONT_HEAD, size=10, bold=True, color=GREEN)
    add_text(p, text, name=FONT_HEAD, size=11.5, bold=True, color=GREEN_DARK)
    paragraph_spacing(p, before=10, after=10, line=1.35)
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    return p


def definition_box(doc, term, definition):
    p1 = _box_open(doc, CREAM, BROWN, before=10, sides=('top', 'left', 'right'))
    add_text(p1, "تعريف", name=FONT_HEAD, size=9.5, bold=True, color=BROWN)
    p2 = doc.add_paragraph()
    rtl_paragraph(p2)
    shade_paragraph(p2, CREAM)
    border_paragraph(p2, color=BROWN, sz=6, sides=('left', 'right', 'bottom'), space=10)
    paragraph_spacing(p2, before=0, after=10, line=1.35)
    paragraph_indent(p2, left=0.15, right=0.15)
    if term:
        add_text(p2, term + "  ", name=FONT_HEAD, size=11, bold=True, color="1f1f1f")
    add_text(p2, definition, name=FONT_BODY, size=11, color="1f1f1f")
    return p1


def example_box(doc, title, lines, conclusion=None):
    p1 = _box_open(doc, WHITE, GRAY_MED, before=10, sz=6)
    p1._p.pPr.find(qn('w:pBdr'))  # ensure exists
    add_text(p1, f"مثال تطبيقي  ·  {title}", name=FONT_HEAD, size=10.5, bold=True,
              color=BROWN)
    for line in lines:
        p = doc.add_paragraph()
        rtl_paragraph(p)
        shade_paragraph(p, WHITE)
        border_paragraph(p, color=GRAY_MED, sz=6, sides=('left', 'right'), space=10)
        paragraph_spacing(p, before=0, after=2, line=1.3)
        paragraph_indent(p, left=0.15, right=0.15)
        add_text(p, line, name=FONT_BODY, size=10.5, color="333333")
    if conclusion:
        pc = doc.add_paragraph()
        rtl_paragraph(pc)
        shade_paragraph(pc, GOLD_TINT)
        border_paragraph(pc, color=GRAY_MED, sz=6, sides=('left', 'right', 'bottom'),
                          space=10)
        paragraph_spacing(pc, before=4, after=10, line=1.3)
        paragraph_indent(pc, left=0.15, right=0.15)
        add_text(pc, conclusion, name=FONT_HEAD, size=10.5, bold=True, color=GREEN_DARK)
    else:
        if lines:
            pass
    return p1


def process_flow(doc, steps, sub=None, compact=False):
    """steps: list[str] top-to-bottom. sub: optional list[str|None] same length."""
    n = len(steps)
    tbl = doc.add_table(rows=n, cols=1)
    set_table_rtl(tbl)
    tbl.alignment = 1
    tbl.autofit = False
    set_col_widths(tbl, [15.5])
    for i, step in enumerate(steps):
        cell = tbl.rows[i].cells[0]
        p = cell.paragraphs[0]
        rtl_paragraph(p, align='center')
        paragraph_spacing(p, before=(3 if compact else 5), after=(3 if compact else 5), line=1.15)
        add_text(p, step, name=FONT_HEAD, size=(10 if compact else 11), bold=True, color=WHITE)
        if sub and i < len(sub) and sub[i]:
            p2 = cell.add_paragraph()
            rtl_paragraph(p2, align='center')
            paragraph_spacing(p2, before=1, after=(3 if compact else 5))
            add_text(p2, sub[i], name=FONT_BODY, size=9, color="eef3ee")
        shade = GREEN if i % 2 == 0 else GREEN_DARK
        shade_cell(cell, shade)
        cell_borders(cell, color=WHITE, sz=4)
        cell_valign(cell, 'center')
        cell_margins(cell, top=60, bottom=60, start=120, end=120)
    spacer(doc)
    return tbl


def process_flow_horizontal(doc, steps):
    n = len(steps)
    tbl = doc.add_table(rows=1, cols=n)
    set_table_rtl(tbl)
    tbl.autofit = False
    set_col_widths(tbl, [15.5 / n] * n)
    for i, step in enumerate(steps):
        cell = tbl.rows[0].cells[i]
        p = cell.paragraphs[0]
        rtl_paragraph(p, align='center')
        paragraph_spacing(p, before=4, after=4, line=1.15)
        add_text(p, step, name=FONT_HEAD, size=9.5, bold=True, color=WHITE)
        shade_cell(cell, GREEN if i % 2 == 0 else GREEN_DARK)
        cell_borders(cell, color=WHITE, sz=4)
        cell_valign(cell, 'center')
        cell_margins(cell, top=60, bottom=60, start=60, end=60)
    spacer(doc)
    return tbl


def concept_cards_grid(doc, items, cols=2, center_label=None):
    """items: list[str] rendered as a small card grid (for SmartArt-derived
    element lists such as the 3-4 factors behind a gate's logic)."""
    import math
    rows = math.ceil(len(items) / cols)
    tbl = doc.add_table(rows=rows, cols=cols)
    set_table_rtl(tbl)
    tbl.autofit = False
    set_col_widths(tbl, [15.5 / cols] * cols)
    k = 0
    for r in range(rows):
        for c in range(cols):
            cell = tbl.rows[r].cells[c]
            if k < len(items):
                p = cell.paragraphs[0]
                rtl_paragraph(p, align='center')
                paragraph_spacing(p, before=8, after=2, line=1.2)
                add_text(p, "◆", name=FONT_HEAD, size=10, color=GOLD)
                p2 = cell.add_paragraph()
                rtl_paragraph(p2, align='center')
                paragraph_spacing(p2, before=0, after=8, line=1.2)
                add_text(p2, items[k], name=FONT_HEAD, size=10.5, bold=True, color=GREEN_DARK)
                shade_cell(cell, GREEN_TINT)
            cell_borders(cell, color=GREEN_TINT2, sz=6)
            cell_valign(cell, 'center')
            cell_margins(cell, top=80, bottom=80, start=80, end=80)
            k += 1
    if center_label:
        p = doc.add_paragraph()
        rtl_paragraph(p, align='center')
        add_text(p, f"↓   {center_label}", name=FONT_HEAD, size=10.5, bold=True,
                 color=GREEN)
    spacer(doc)
    return tbl


def classification_cards(doc, entries):
    """entries: list[(letter,label,desc,color)]"""
    n = len(entries)
    tbl = doc.add_table(rows=1, cols=n)
    set_table_rtl(tbl)
    tbl.autofit = False
    set_col_widths(tbl, [15.5 / n] * n)
    for i, (letter, label, desc, color) in enumerate(entries):
        cell = tbl.rows[0].cells[i]
        p = cell.paragraphs[0]
        rtl_paragraph(p, align='center')
        paragraph_spacing(p, before=6, after=2)
        add_text(p, letter, name=FONT_HEAD, size=15, bold=True, color=WHITE)
        p2 = cell.add_paragraph()
        rtl_paragraph(p2, align='center')
        paragraph_spacing(p2, before=0, after=4)
        add_text(p2, label, name=FONT_HEAD, size=10, bold=True, color=WHITE)
        p3 = cell.add_paragraph()
        rtl_paragraph(p3, align='center')
        paragraph_spacing(p3, before=0, after=6)
        add_text(p3, desc, name=FONT_BODY, size=8.3, color=WHITE)
        shade_cell(cell, color)
        cell_borders(cell, color=WHITE, sz=4)
        cell_valign(cell, 'center')
        cell_margins(cell, top=80, bottom=80, start=60, end=60)
    spacer(doc)
    return tbl


def output_cards(doc, items, cols=2):
    import math
    rows = math.ceil(len(items) / cols)
    tbl = doc.add_table(rows=rows, cols=cols)
    set_table_rtl(tbl)
    tbl.autofit = False
    set_col_widths(tbl, [15.5 / cols] * cols)
    k = 0
    for r in range(rows):
        for c in range(cols):
            cell = tbl.rows[r].cells[c]
            if k < len(items):
                p = cell.paragraphs[0]
                rtl_paragraph(p, align='right')
                paragraph_spacing(p, before=6, after=6, line=1.25)
                add_text(p, "▣ ", name=FONT_HEAD, size=10.5, bold=True, color=GOLD)
                add_text(p, items[k], name=FONT_BODY, size=10.5, color="1f1f1f")
                shade_cell(cell, WHITE)
            cell_borders(cell, color=GREEN_TINT2, sz=6)
            cell_valign(cell, 'center')
            cell_margins(cell, top=60, bottom=60, start=100, end=100)
            k += 1
    spacer(doc)
    return tbl


def style_role_table(table, col_widths=None):
    """Two-column role/RACI-style comparison: green header for col A,
    brown/gold header for col B, banded bodies."""
    set_table_rtl(table)
    table.alignment = 1
    header_fills = [GREEN, BROWN]
    body_fills = [GREEN_TINT, CREAM]
    for ri, row in enumerate(table.rows):
        for ci, cell in enumerate(row.cells):
            txt = cell.text
            is_header = (ri == 0)
            fill = header_fills[ci % 2] if is_header else body_fills[ci % 2]
            color = WHITE if is_header else "1f1f1f"
            write_cell(cell, txt, bold=is_header, color=color, fill=fill,
                       size=(10.5 if is_header else 10))
            cell_borders(cell, color=(header_fills[ci % 2] if is_header else GRAY_LIGHT), sz=4)
    if col_widths:
        set_col_widths(table, col_widths)


def add_log_rows(table, n=3):
    """Append n blank body rows to a template/log table (headers only) so it
    reads as a usable form rather than a lone header row."""
    ncols = len(table.columns)
    for _ in range(n):
        row = table.add_row()
        for cell in row.cells:
            write_cell(cell, "", size=10)
            cell_borders(cell, color=GRAY_LIGHT, sz=4)
            cell.height = Cm(0.9)


def style_log_table(table, col_widths=None, extra_rows=3):
    add_log_rows(table, extra_rows)
    set_table_rtl(table)
    table.alignment = 1
    for ri, row in enumerate(table.rows):
        for ci, cell in enumerate(row.cells):
            txt = cell.text
            is_header = (ri == 0)
            write_cell(cell, txt, bold=is_header, color=(WHITE if is_header else "1f1f1f"),
                       fill=(GREEN if is_header else WHITE), size=(9.5 if is_header else 10))
            cell_borders(cell, color=(GREEN if is_header else GRAY_LIGHT), sz=4)
    if col_widths:
        set_col_widths(table, col_widths)
