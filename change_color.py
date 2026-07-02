import re

with open('src/components/Score/index.tsx', 'r') as f:
    content = f.read()

# Replace all gold/yellow styles on the right side with blue styles
new_content = content.replace('bgcolor: "#fffaf0"', 'bgcolor: colorStyles.lightBlue')
new_content = new_content.replace('color: colorStyles.gold', 'color: colorStyles.blue')
new_content = new_content.replace("rgba(196, 174, 49, 0.1)", "rgba(29, 78, 216, 0.1)")
new_content = new_content.replace("rgba(196, 174, 49, 0.8)", "rgba(29, 78, 216, 0.6)")

with open('src/components/Score/index.tsx', 'w') as f:
    f.write(new_content)
