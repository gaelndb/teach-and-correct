import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
}

type ManagedHeadElement = {
  element: HTMLMetaElement | HTMLLinkElement
  wasCreated: boolean
  previousValue: string | null
}

function getOrCreateMeta(selector: string, attributes: Record<string, string>): ManagedHeadElement {
  const matchingElements = Array.from(document.head.querySelectorAll<HTMLMetaElement>(selector))
  const existingElement = matchingElements.shift()
  matchingElements.forEach((element) => element.remove())

  const element = existingElement ?? document.createElement('meta')
  const wasCreated = !existingElement

  if (wasCreated) {
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
    document.head.appendChild(element)
  }

  return {
    element,
    wasCreated,
    previousValue: existingElement?.getAttribute('content') ?? null,
  }
}

function getOrCreateCanonical(): ManagedHeadElement {
  const matchingElements = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'))
  const existingElement = matchingElements.shift()
  matchingElements.forEach((element) => element.remove())

  const element = existingElement ?? document.createElement('link')
  const wasCreated = !existingElement

  if (wasCreated) {
    element.rel = 'canonical'
    document.head.appendChild(element)
  }

  return {
    element,
    wasCreated,
    previousValue: existingElement?.getAttribute('href') ?? null,
  }
}

function restoreElement({ element, previousValue, wasCreated }: ManagedHeadElement, attribute: 'content' | 'href') {
  if (wasCreated) {
    element.remove()
    return
  }

  if (previousValue === null) {
    element.removeAttribute(attribute)
    return
  }

  element.setAttribute(attribute, previousValue)
}

export function Seo({
  title,
  description,
  canonical,
  ogTitle = title,
  ogDescription = description,
  ogUrl = canonical,
}: SeoProps) {
  useEffect(() => {
    const previousTitle = document.title
    const descriptionTag = getOrCreateMeta('meta[name="description"]', { name: 'description' })
    const ogTitleTag = getOrCreateMeta('meta[property="og:title"]', { property: 'og:title' })
    const ogDescriptionTag = getOrCreateMeta('meta[property="og:description"]', { property: 'og:description' })
    const ogUrlTag = getOrCreateMeta('meta[property="og:url"]', { property: 'og:url' })
    const canonicalTag = getOrCreateCanonical()

    document.title = title
    descriptionTag.element.setAttribute('content', description)
    ogTitleTag.element.setAttribute('content', ogTitle)
    ogDescriptionTag.element.setAttribute('content', ogDescription)
    ogUrlTag.element.setAttribute('content', ogUrl)
    canonicalTag.element.setAttribute('href', canonical)

    return () => {
      document.title = previousTitle
      restoreElement(descriptionTag, 'content')
      restoreElement(ogTitleTag, 'content')
      restoreElement(ogDescriptionTag, 'content')
      restoreElement(ogUrlTag, 'content')
      restoreElement(canonicalTag, 'href')
    }
  }, [canonical, description, ogDescription, ogTitle, ogUrl, title])

  return null
}
