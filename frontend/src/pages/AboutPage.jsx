import { Card, List, Stack, Text, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

function AboutPage() {
  const { t } = useTranslation()

  return (
    <Stack>
      <Title order={1}>{t('about.title')}</Title>
      <Text>{t('about.summary')}</Text>
      <Card withBorder>
        <Title order={3} mb="sm">
          {t('about.highlightsTitle')}
        </Title>
        <List>
          <List.Item>{t('about.highlight1')}</List.Item>
          <List.Item>{t('about.highlight2')}</List.Item>
          <List.Item>{t('about.highlight3')}</List.Item>
        </List>
      </Card>
    </Stack>
  )
}

export default AboutPage
