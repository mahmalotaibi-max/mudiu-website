#!/usr/bin/env python3
"""Pass 1: extract every block (paragraph/table) from source.docx, in document
order, into a JSON ground-truth model. No text is invented or dropped here —
this is a mechanical, verifiable copy."""
import json
import sys
from docx import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph

SRC = "/home/user/mudiu-website/docwork/source.docx"
OUT = "/home/user/mudiu-website/docwork/build/content_model.json"


def iter_block_items(parent):
    parent_elm = parent.element.body
    for child in parent_elm.iterchildren():
        if child.tag == qn('w:p'):
            yield Paragraph(child, parent)
        elif child.tag == qn('w:tbl'):
            yield Table(child, parent)


def para_is_list(p):
    pPr = p._p.pPr
    if pPr is None:
        return False
    numPr = pPr.find(qn('w:numPr'))
    return numPr is not None


def para_runs(p):
    """Walk every <w:r>, including ones nested inside <w:hyperlink> —
    p.runs alone skips hyperlink-wrapped runs and silently drops their text."""
    from docx.text.run import Run
    runs = []
    for r_el in p._p.findall('.//' + qn('w:r')):
        r = Run(r_el, p)
        t = r.text
        if t == "":
            continue
        runs.append({
            "t": t,
            "b": bool(r.bold),
            "i": bool(r.italic),
            "u": bool(r.underline),
        })
    return runs


def para_has_drawing(p):
    xml = p._p.xml
    return ('<wp:inline' in xml) or ('<w:drawing' in xml)


def cell_text(cell):
    parts = []
    for p in cell.paragraphs:
        txt = p.text.strip()
        if txt:
            parts.append(txt)
    return "\n".join(parts)


def main():
    doc = Document(SRC)
    blocks = []
    for idx, item in enumerate(iter_block_items(doc)):
        if isinstance(item, Paragraph):
            runs = para_runs(item)
            text = "".join(r["t"] for r in runs)
            blocks.append({
                "kind": "p",
                "idx": idx,
                "style": item.style.name if item.style else None,
                "text": text,
                "runs": runs,
                "is_list": para_is_list(item),
                "has_drawing": para_has_drawing(item),
            })
        elif isinstance(item, Table):
            rows = []
            for row in item.rows:
                rows.append([cell_text(c) for c in row.cells])
            blocks.append({
                "kind": "tbl",
                "idx": idx,
                "rows": rows,
                "nrows": len(item.rows),
                "ncols": len(item.columns),
            })
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(blocks, f, ensure_ascii=False, indent=1)
    print(f"Wrote {len(blocks)} blocks to {OUT}")
    # sanity: total text length
    total_chars = sum(len(b.get("text", "")) for b in blocks if b["kind"] == "p")
    print(f"Total paragraph chars: {total_chars}")
    n_tbl = sum(1 for b in blocks if b["kind"] == "tbl")
    print(f"Tables: {n_tbl}")


if __name__ == "__main__":
    main()
