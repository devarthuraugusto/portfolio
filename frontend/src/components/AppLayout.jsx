import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

const navItems = [
  { to: '/', labelKey: 'nav.about' },
  { to: '/projetos', labelKey: 'nav.projects' },
  { to: '/experiencias', labelKey: 'nav.experiences' },
  { to: '/contato', labelKey: 'nav.contact' },
]
const CURRENT_YEAR = new Date().getFullYear()

function AppLayout({ children }) {
  const { t, i18n } = useTranslation()
  const [opened, { toggle, close }] = useDisclosure(false)
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState(false)

  const toggleLanguage = async () => {
    const nextLanguage = i18n.language === 'pt' ? 'en' : 'pt'
    setIsSwitchingLanguage(true)
    await i18n.changeLanguage(nextLanguage)
    setIsSwitchingLanguage(false)
  }

  const links = navItems.map((item) => (
    <Button
      key={item.to}
      component={NavLink}
      to={item.to}
      variant="subtle"
      c="gray.0"
      onClick={close}
    >
      {t(item.labelKey)}
    </Button>
  ))

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 230, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md" bg="dark.8">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
            <Title order={3} c="white" component={Link} to="/" style={{ textDecoration: 'none' }}>
              Portfolio
            </Title>
          </Group>
          <Group visibleFrom="sm">{links}</Group>
          <Button
            variant="light"
            color="gray"
            onClick={toggleLanguage}
            loading={isSwitchingLanguage}
          >
            {t('nav.languageToggle')}
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" bg="dark.8" hiddenFrom="sm">
        <Stack>{links}</Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg" py="md">
          {children}
        </Container>
      </AppShell.Main>

      <AppShell.Footer withBorder={false}>
        <Group justify="center" p="md" bg="dark.8">
          <Text c="gray.0">© {CURRENT_YEAR} Portfolio</Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  )
}

export default AppLayout
