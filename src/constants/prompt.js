export const PRODUCT_DESCRIPTION_PROMPT = `
Create a detailed product description for my ecommerce website.

Product Name: %s
Category: %s
Brand: %s

Requirements:
- Return ONLY the product description.
- Use valid Markdown formatting.
- Use a clear # heading.
- Use paragraphs.
- Use bullet points where appropriate.
- Do not include unnecessary information.
- Do not wrap the response in a code block.
- Do not add any explanation before or after the description.
`