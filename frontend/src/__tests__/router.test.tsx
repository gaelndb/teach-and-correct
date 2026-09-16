import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '@/app'

describe('Route rendering', () => {
  it('renders the not-found page', () => {
    window.history.replaceState({}, '', '/unknown-route')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Page not found/i }),
    ).toBeInTheDocument()
  })

  it('renders the landing page', () => {
    window.history.replaceState({}, '', '/')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Corrigez vos copies/i }),
    ).toBeInTheDocument()
  })

  it('renders the contact page', () => {
    window.history.replaceState({}, '', '/contact')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Une question \? Écrivons-nous\./i }),
    ).toBeInTheDocument()
  })

  it('renders the login page', () => {
    window.history.replaceState({}, '', '/login')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Bienvenue/i }),
    ).toBeInTheDocument()
  })

  it('renders the signup page', () => {
    window.history.replaceState({}, '', '/signup')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Créez votre compte/i }),
    ).toBeInTheDocument()
  })

  it('renders the dashboard students page', () => {
    window.history.replaceState({}, '', '/dashboard/students')

    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /^Mes élèves$/i }),
    ).toBeInTheDocument()
  })

  it('renders the dashboard copies page', () => {
    window.history.replaceState({}, '', '/dashboard/copies')

    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /^Mes copies$/i }),
    ).toBeInTheDocument()
  })

  it('renders the dashboard import page', () => {
    window.history.replaceState({}, '', '/dashboard/import')

    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /^Importer des copies$/i }),
    ).toBeInTheDocument()
  })
})

describe('Public navigation', () => {
  it('navigates from landing page to login page when clicking login link', async () => {
    window.history.replaceState({}, '', '/')

    const user = userEvent.setup()

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Corrigez vos copies/i }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('link', { name: /^Connexion$/i }),
    )

    expect(window.location.pathname).toBe('/login')
    expect(
      screen.getByRole('heading', { name: /Bienvenue/i }),
    ).toBeInTheDocument()
  })

  it('navigates from landing page to signup page when clicking signup link', async () => {
    window.history.replaceState({}, '', '/')

    const user = userEvent.setup()

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Corrigez vos copies/i }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('link', { name: /^Essayer gratuitement$/i }),
    )

    expect(window.location.pathname).toBe('/signup')
    expect(
      screen.getByRole('heading', { name: /Créez votre compte/i }),
    ).toBeInTheDocument()
  })

  it('navigates from landing page to contact page when clicking contact button', async () => {
    window.history.replaceState({}, '', '/')

    const user = userEvent.setup()

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Corrigez vos copies/i }),
    ).toBeInTheDocument()

    const navigation = screen.getByRole('navigation')

    await user.click(
      within(navigation).getByRole('button', { name: /^Contact$/i }),
    )

    expect(window.location.pathname).toBe('/contact')
    expect(
      screen.getByRole('heading', { name: /Une question \? Écrivons-nous\./i }),
    ).toBeInTheDocument()
  })

  it('navigates from landing page to contact page and supports browser back and forward', async () => {
    window.history.replaceState({}, '', '/')

    const user = userEvent.setup()

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Corrigez vos copies/i }),
    ).toBeInTheDocument()

    const navigation = screen.getByRole('navigation')

    await user.click(
      within(navigation).getByRole('button', { name: /^Contact$/i }),
    )

    expect(window.location.pathname).toBe('/contact')

    window.history.back()

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
      expect(
        screen.getByRole('heading', { name: /Corrigez vos copies/i }),
      ).toBeInTheDocument()
    })

    window.history.forward()

    await waitFor(() => {
      expect(window.location.pathname).toBe('/contact')
      expect(
        screen.getByRole('heading', { name: /Une question \? Écrivons-nous\./i }),
      ).toBeInTheDocument()
    })
  })
})

describe('Dashboard navigation', () => {
  it('navigates from students to copies and import pages', async () => {
    window.history.replaceState({}, '', '/dashboard/students')

    const user = userEvent.setup()

    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /^Mes élèves$/i }),
    ).toBeInTheDocument()

    const navigation = screen.getByRole('navigation')

    await user.click(
      within(navigation).getByRole('link', { name: /^Copies$/i }),
    )

    expect(window.location.pathname).toBe('/dashboard/copies')
    expect(
      await screen.findByRole('heading', { level: 1, name: /^Mes copies$/i }),
    ).toBeInTheDocument()

    const header = screen.getByRole('banner')

    await user.click(
      within(header).getByRole('button', { name: /^Nouvelle copie$/i }),
    )

    expect(window.location.pathname).toBe('/dashboard/import')
    expect(
      await screen.findByRole('heading', { level: 1, name: /^Importer des copies$/i }),
    ).toBeInTheDocument()
  })
})
