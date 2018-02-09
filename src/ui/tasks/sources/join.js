export default (
  `def join(sep, items):
    res = ''
    if len(items) > 0:
        res = str(items[0])
        items = items[1:]
        while len(items) > 0:
            res = res + sep + str(items[0])
            items = items[1:]
    return res`
);