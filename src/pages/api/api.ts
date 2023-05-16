import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch products' });
  }
}
