import os
import re

files = [
    "about.html", "blog-detail.html", "blog.html", "careers.html", "contact.html",
    "faq.html", "industries.html", "portfolio.html", "privacy.html", "products.html",
    "reviews.html", "technology.html", "terms.html", "why-us.html"
]

header_pattern = re.compile(r'<div class="top-header">.*?</div>\s*</div>\s*</div>', re.DOTALL)

# Alternative pattern if the first one is too specific
header_pattern_simple = re.compile(r'<div class="top-header">.*?</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)

# Let's try a very generic one that looks for the top-header div and its container structure
generic_pattern = re.compile(r'<div class="top-header">.*?<header', re.DOTALL)

for filename in files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove the top-header div and everything inside it up to the header tag
        new_content = re.sub(r'<div class="top-header">.*?<header', '<header', content, flags=re.DOTALL)
        
        if content != new_content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Cleaned {filename}")
        else:
            print(f"No changes for {filename}")
