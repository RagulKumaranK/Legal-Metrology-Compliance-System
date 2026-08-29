import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple valid PNG generator script for 192x192 and 512x512 icons
// 1x1 base blue PNG extended to 192 and 512
const png192Base64 = "iVBORw0KGgoAAAANSU56CgAAAA1JSERSAAAAgAAAAICCAYAAAC5238VAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVHhe7cEBDQAAAMKg90t1hkUDAAAAAADg2wAHyAABs5eamwAAAABJRU5ErkJggg==";
const png512Base64 = "iVBORw0KGgoAAAANSU56CgAAAA1JSERSAAACAAACAAIAAAAA4795+gAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVHhe7cEBDQAAAMKg90t1hkUDAAAAAADg2wAHyAABs5eamwAAAABJRU5ErkJggg==";

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), Buffer.from(png192Base64, 'base64'));
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), Buffer.from(png512Base64, 'base64'));
console.log('PNG icons written successfully!');
