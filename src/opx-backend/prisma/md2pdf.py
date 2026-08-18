#!/usr/bin/env python3
import markdown
from weasyprint import HTML, CSS
import os

# Read markdown file
with open('/home/rogan/Documents/opx/prisma/docs.md', 'r', encoding='utf-8') as f:
    md_content = f.read()

# Convert markdown to HTML
html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{
            font-family: 'Helvetica', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            color: #333;
        }}
        h1 {{
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }}
        h2 {{
            color: #34495e;
            border-bottom: 2px solid #3498db;
            padding-bottom: 8px;
            margin-top: 30px;
        }}
        h3 {{
            color: #34495e;
            margin-top: 20px;
        }}
        h4 {{
            color: #7f8c8d;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }}
        th {{
            background-color: #3498db;
            color: white;
            padding: 10px;
            text-align: left;
        }}
        td {{
            border: 1px solid #ddd;
            padding: 8px;
        }}
        tr:nth-child(even) {{
            background-color: #f2f2f2;
        }}
        code {{
            background-color: #f4f4f4;
            padding: 2px 5px;
            border-radius: 3px;
        }}
        pre {{
            background-color: #f4f4f4;
            padding: 10px;
            border-left: 3px solid #3498db;
            overflow-x: auto;
        }}
        hr {{
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }}
        ul {{
            margin-left: 20px;
        }}
        .toc {{
            background-color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }}
    </style>
</head>
<body>
{markdown.markdown(md_content, extensions=['tables', 'fenced_code'])}
</body>
</html>
"""

# Convert to PDF
output_path = '/home/rogan/Documents/opx/prisma/documentacao_banco_dados.pdf'
HTML(string=html_content).write_pdf(output_path)

print(f"PDF gerado com sucesso: {output_path}")
