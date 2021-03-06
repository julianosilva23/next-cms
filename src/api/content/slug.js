// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function getContent(slug) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREAD_SHEET);  

  await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();

  const contentObject = rows.find(content => content.slug === slug);

  if (!contentObject) {
      return {
        notFound: true,
      }
  }

  const { title, body } = contentObject;

  return { title, body, slug }

}