import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const lock = JSON.parse(readFileSync(resolve(__dirname, '../package-lock.json'), 'utf8'))

// GHSA-587h-7wmj-h5pm / CVE-2026-112942 (HIGH, CWE-77). Nguyên nhân gốc là
// launch-editor, nhưng bản tin vá theo từng dải của vite; mỗi dòng dưới đây là
// một dải vite bị ảnh hưởng và bản vá đầu tiên của dải đó. Nguồn:
//   curl -s https://api.osv.dev/v1/vulns/GHSA-587h-7wmj-h5pm
const VITE_AFFECTED = [
  { introduced: '0.0.0', fixed: '6.4.4' },
  { introduced: '7.0.0', fixed: '7.3.7' },
  { introduced: '8.0.0', fixed: '8.1.6' },
  { introduced: '8.2.0', fixed: '8.2.4' },
  { introduced: '8.3.0', fixed: '8.3.3' },
]

function parseVersion(v) {
  return String(v).split('.').map(n => Number.parseInt(n, 10))
}

function compare(a, b) {
  const x = parseVersion(a)
  const y = parseVersion(b)
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] || 0) - (y[i] || 0)
    if (d !== 0) return d < 0 ? -1 : 1
  }
  return 0
}

function inAffectedRange(version, range) {
  return compare(version, range.introduced) >= 0 && compare(version, range.fixed) < 0
}

// Mọi bản vite mà `npm ci` sẽ cài: bản gốc và cả bản lồng trong node_modules.
const installedVite = Object.entries(lock.packages)
  .filter(([path]) => path === 'node_modules/vite' || /node_modules\/.*\/node_modules\/vite$/.test(path))
  .map(([path, pkg]) => ({ path, version: pkg.version }))

describe('phụ thuộc vite: GHSA-587h-7wmj-h5pm', () => {
  it('package-lock.json ghim mọi bản vite ngoài dải bị ảnh hưởng', () => {
    expect(installedVite.length).toBeGreaterThan(0)

    const vulnerable = installedVite.filter(({ version }) =>
      VITE_AFFECTED.some(range => inAffectedRange(version, range)),
    )

    expect(
      vulnerable.map(p => `${p.path}@${p.version}`),
      'vite trong package-lock.json vẫn nằm trong dải bị ảnh hưởng',
    ).toEqual([])
  })
})
