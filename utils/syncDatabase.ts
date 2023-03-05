import get from 'axios';
const sqlite3 = require('sqlite3').verbose();

export const syncDatabase = (module: string) => {
  const db = new sqlite3.Database('dina.db', sqlite3.OPEN_READWRITE, (err: any) => {
    if (err) throw err;
  })

  return new Promise(async (resolve, reject) => {
    console.debug(`[API][db-sync] running update on`, module);
    try {
      let apiRes: any[];
      switch (module) {
        case 'items':
          apiRes = await (await get('https://api.arsha.io/util/db/dump?lang=en')).data;
          break;

        case 'recipes':
          apiRes = await (await get('https://api.arsha.io/util/db/recipes/dump?lang=en')).data;
          break;

        case 'mrecipes':
          apiRes = await (await get('https://api.arsha.io/util/db/mrecipes/dump?lang=en')).data;
          break;
      }
      

      db.serialize(() => {
        db.run(`DROP TABLE IF EXISTS ${module}`);

        let objects: string[] = [];
        switch (module) {
          case 'items':
            db.run(`CREATE TABLE IF NOT EXISTS ${module} (
              id INTEGER PRIMARY KEY,
              name TEXT,
              grade TEXT,
              icon TEXT
            );`);
  
            for(const apiData of apiRes) {
              objects.push(`(${apiData.id}, "${apiData.name}", "${apiData.grade}", "${apiData.icon ?? ''}")`);
            }
            db.run(`INSERT INTO ${module} VALUES ${objects.join(', ')};`);

            break;
          case 'recipes':  
            db.run(`CREATE TABLE IF NOT EXISTS ${module} (
              id INTEGER PRIMARY KEY,
              name TEXT,
              lifeskill TEXT,
              level TEXT,
              exp TEXT,
              components TEXT,
              products TEXT
            );` );
  
            for(const apiData of apiRes) {
              objects.push(`(${apiData.id}, "${apiData.name}", "${apiData.lifeskill}", "${apiData.level}", "${apiData.exp}", "${JSON.stringify(apiData.components).replaceAll('"', "'")}", "${JSON.stringify(apiData.products).replaceAll('"', "'")}")`);
            }
            db.run(`INSERT INTO ${module} VALUES ${objects.join(', ')};`);
  
            break;

          case 'mrecipes':  
            db.run(`CREATE TABLE IF NOT EXISTS ${module} (
              id INTEGER PRIMARY KEY,
              name TEXT,
              lifeskill TEXT,
              level TEXT,
              exp TEXT,
              components TEXT,
              products TEXT
            );` );
  
            for(const apiData of apiRes) {
              objects.push(`(${apiData.id}, "${apiData.name}", "${apiData.lifeskill}", "${apiData.level}", "${apiData.exp}", "${JSON.stringify(apiData.components).replaceAll('"', "'")}", "${JSON.stringify(apiData.products).replaceAll('"', "'")}")`);
            }
            db.run(`INSERT INTO ${module} VALUES ${objects.join(', ')};`);
  
            break;
        }
          
      })

      db.close((err: any) => {
        if (err) {
          throw err;
        }
      })

      resolve('OK');
    } catch (error) {
      reject(error);
    }
  })
}