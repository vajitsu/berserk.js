/*
The MIT License (MIT)

Copyright (c) 2023 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
// the minimum number of operations required to convert string a to string b.
function minDistance(a: string, b: string, threshold: number): number {
  const m = a.length
  const n = b.length

  if (m < n) {
    return minDistance(b, a, threshold)
  }

  if (n === 0) {
    return m
  }

  let previousRow = Array.from({ length: n + 1 }, (_, i) => i)

  for (let i = 0; i < m; i++) {
    const s1 = a[i]
    let currentRow = [i + 1]
    for (let j = 0; j < n; j++) {
      const s2 = b[j]
      const insertions = previousRow[j + 1] + 1
      const deletions = currentRow[j] + 1
      const substitutions = previousRow[j] + Number(s1 !== s2)
      currentRow.push(Math.min(insertions, deletions, substitutions))
    }
    previousRow = currentRow
  }
  return previousRow[previousRow.length - 1]
}

export function detectTypo(input: string, options: string[], threshold = 2) {
  const potentialTypos = options
    .map((o) => ({
      option: o,
      distance: minDistance(o, input, threshold),
    }))
    .filter(({ distance }) => distance <= threshold && distance > 0)
    .sort((a, b) => a.distance - b.distance)

  if (potentialTypos.length) {
    return potentialTypos[0].option
  }
  return null
}
