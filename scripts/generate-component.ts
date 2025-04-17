import fs from 'fs'
import path from 'path'

const componentTemplate = (name: string) => `
import { Box } from '@mui/material'

export interface ${name}Props {
  children?: React.ReactNode
}

export function ${name}({ children }: ${name}Props) {
  return <Box>{children}</Box>
}
`

const testTemplate = (name: string) => `
import { render, screen } from '@testing-library/react'
import { ${name} } from './${name}'

describe('${name}', () => {
  it('renders children', () => {
    render(<${name}>Test</${name}>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
`

const indexTemplate = (name: string) => `
export { ${name} } from './${name}'
export type { ${name}Props } from './${name}'
`

function generateComponent(name: string) {
  const componentDir = path.join(process.cwd(), 'src/components', name)

  // Create component directory
  fs.mkdirSync(componentDir, { recursive: true })

  // Create component files
  fs.writeFileSync(
    path.join(componentDir, `${name}.tsx`),
    componentTemplate(name),
  )
  fs.writeFileSync(
    path.join(componentDir, `${name}.test.tsx`),
    testTemplate(name),
  )
  fs.writeFileSync(path.join(componentDir, 'index.ts'), indexTemplate(name))
}

// Get component name from command line arguments
const componentName = process.argv[2]
if (!componentName) {
  console.error('Please provide a component name')
  process.exit(1)
}

generateComponent(componentName)
console.log(`Component ${componentName} generated successfully!`)
