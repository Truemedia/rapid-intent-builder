module.exports = class DataObject
{
    toJson()
    {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
          a[b] = this[b];
          return a;
        }, {});
    }
};
