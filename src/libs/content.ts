interface Mention {
  kg_id: string;
  count: number;
}

export const processContent = async (url: string) => {
  const [_1, _2, domain, sport, article] = url.split("/");

  const mentions = Array(4)
    .fill(0)
    .map(() => {
      const kg_id = Math.random().toString(36).slice(2, 7);
      const count = Array(3)
        .fill(0)
        .reduce((p) => (p += Math.floor(Math.random() * 5)));

      return { kg_id: `/m/${kg_id}`, count };
    });
  // find the max count in mentions
  const max = mentions.reduce((p, v) => (v.count > p ? v.count : p), 0);
  // force the 'sport' as kg_id with 'max' count
  return <Mention[]>[{ kg_id: `/m/${sport}`, count: max }, ...mentions];
};
