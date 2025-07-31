const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'public/images/products/en');
const outputDir = path.join(__dirname, 'public/products-data/en');

async function convertHtmlToJson() {
  try {
    await fs.ensureDir(outputDir);
    const productDirs = await fs.readdir(sourceDir);

    for (const productDir of productDirs) {
      const indexPath = path.join(sourceDir, productDir, 'index.html');
      if (await fs.pathExists(indexPath)) {
        const html = await fs.readFile(indexPath, 'utf-8');
        const $ = cheerio.load(html);

        const productData = {};
        const container = $('.container');

        productData.title = container.find('.page-title').first().text().trim();
        productData.subtitle = container.find('.subtitle').first().text().trim();

        productData.images = [];
        container.find('.images img').each((i, el) => {
          const src = $(el).attr('src');
          if (src) {
            productData.images.push({
              src: `/images/products/en/${productDir}/${src}`,
              alt: path.basename(src, path.extname(src))
            });
          }
        });

        const sections = [];
        container.find('.section-title').each((i, el) => {
            const sectionTitle = $(el).text().trim();
            const contentBlocks = [];
            let currentElement = $(el).next();

            while (currentElement.length && !currentElement.hasClass('section-title') && !currentElement.hasClass('footnote')) {
                const tagName = currentElement.prop('tagName')?.toLowerCase();
                let block = null;

                if (tagName === 'ul') {
                    const listItems = [];
                    currentElement.find('li').each((j, li) => {
                        const mainText = $(li).clone().children().remove().end().text().trim();
                        const subpoints = [];
                        $(li).find('ul > li').each((k, subLi) => {
                            subpoints.push($(subLi).text().trim());
                        });
                        if (subpoints.length > 0) {
                            listItems.push({ text: mainText, subpoints: subpoints });
                        } else {
                            listItems.push(mainText);
                        }
                    });

                    if (listItems.length > 0) {
                        if (sectionTitle.includes('主要特征') || sectionTitle.includes('特点') || sectionTitle.includes('产品特点')) {
                            block = { type: 'features', data: listItems };
                        } else if (sectionTitle.includes('应用') || sectionTitle.includes('用途')) {
                            block = { type: 'applications', data: listItems };
                        } else {
                            block = { type: 'applications', data: listItems };
                        }
                    }
                } else if (tagName === 'table') {
                    const table = currentElement;
                    const rows = [];
                    table.find('tr').each((j, tr) => {
                        const row = [];
                        $(tr).children().each((k, cell) => {
                            const cellEl = $(cell);
                            row.push({
                                tag: cell.tagName.toLowerCase(),
                                text: cellEl.text().trim().replace(/\n/g, ', '),
                                colspan: cellEl.attr('colspan') ? parseInt(cellEl.attr('colspan')) : 1,
                                rowspan: cellEl.attr('rowspan') ? parseInt(cellEl.attr('rowspan')) : 1,
                            });
                        });
                        if (row.length > 0) {
                            rows.push(row);
                        }
                    });
                    block = { type: 'table', data: { rows } };

                } else if (tagName === 'p') {
                     const p_text = currentElement.text().trim();
                     if (p_text) {
                        if (sectionTitle.includes('包装') || sectionTitle.includes('储存')) {
                            block = { type: 'storage', data: p_text };
                        }
                     }
                }

                if (block) {
                    contentBlocks.push(block);
                }

                currentElement = currentElement.next();
            }

            if (contentBlocks.length > 0) {
                sections.push({
                    title: sectionTitle,
                    content: contentBlocks
                });
            }
        });

        productData.sections = sections;

        const footnotes = [];
        container.find('.footnote p').each((i, el) => {
          footnotes.push($(el).text().trim());
        });
        productData.footnotes = footnotes;


        const jsonFileName = `${productDir}.json`;
        const jsonFilePath = path.join(outputDir, jsonFileName);
        await fs.writeJson(jsonFilePath, productData, { spaces: 2 });
        console.log(`Converted ${productDir} to JSON.`);
      }
    }
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

convertHtmlToJson();
