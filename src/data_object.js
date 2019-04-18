module.exports = class DataObject
{
    toJson()
    {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
          a[b] = this[b];
          return a;
        }, {});
    }

    filename(ext = 'json', includeExt = true)
    {
      let filename = this.filenames[ext];

      if (includeExt) {
        filename += '.' + ext;
      }

      return filename;
    }
};
