const {BadRequestError} = require('../expressError');

const sqlForPartialUpdate = (dataToUpdate, jsToSql) => {
    console.log(`dataToUpdate: ${JSON.stringify(dataToUpdate)}`);
    console.log(`jsToSql: ${JSON.stringify(jsToSql)}`);

    const keys = Object.keys(dataToUpdate);
    console.log(`check if it is array: ${Array.isArray(Object.keys(dataToUpdate))}`);
    console.log(`Keys: ${keys}`);
    // check if data is null or not
    if (keys.length === 0) throw new BadRequestError("No data");
    // {firstName: "Jason", age: 32} => ['"first_name"=$1', '"age"=$2']
    const cols = keys.map((colName, idx) => {
        console.log(`colName: ${colName}, idx: ${idx}`);
        console.log(`"${jsToSql[colName] || colName}"=$${idx + 1}`);
        return `"${jsToSql[colName] || colName}"=$${idx + 1}`;
    });

    console.log(`check cols: ${cols}`);

    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate),
    }
}

module.exports = {sqlForPartialUpdate};
