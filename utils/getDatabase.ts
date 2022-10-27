const sqlite3 = require('sqlite3').verbose();

export const getDatabase = (sql:string) => {
  const db = new sqlite3.Database('dina.db', sqlite3.OPEN_READONLY, (err: any) => {
    if (err) throw err;
  })

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err:any, rows:any) => {
      if (err) throw err;

      if (rows) {
        resolve(rows);
      } else {
        reject('Unable to get data');
      }

      db.close((err:any) => {
        if (err) throw err;
      })
    })
  })
}