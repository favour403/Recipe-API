import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../../recipes.json');

export const readData = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, JSON.stringify([]));
            return [];
        }
        throw error;
    }
};

export const writeData = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};