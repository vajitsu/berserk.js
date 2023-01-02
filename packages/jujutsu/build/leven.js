/* eslint-disable no-shadow */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
var r = [],
  t = []
export default function e(e, o) {
  if (e === o) return 0
  var a,
    h,
    f,
    n,
    c = e
  e.length > o.length && ((e = o), (o = c))
  for (
    var d = e.length, A = o.length;
    d > 0 && e.charCodeAt(~-d) === o.charCodeAt(~-A);

  )
    d--, A--
  for (var C = 0; C < d && e.charCodeAt(C) === o.charCodeAt(C); ) C++
  if (((d -= C), (A -= C), 0 === d)) return A
  for (var l = 0, u = 0; l < d; ) (t[l] = e.charCodeAt(C + l)), (r[l] = ++l)
  for (; u < A; )
    for (l = 0, a = o.charCodeAt(C + u), f = u++, h = u; l < d; l++)
      (n = a === t[l] ? f : f + 1),
        (f = r[l]),
        (h = r[l] = f > h ? (n > h ? h + 1 : n) : n > f ? f + 1 : n)
  return h
}
