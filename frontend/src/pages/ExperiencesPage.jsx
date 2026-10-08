import { useEffect, useMemo, useState } from 'react'
import { Alert, Card, Grid, Loader, Stack, Text, Title } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { fallbackExperiences } from '../data/experiences'
import { fetchExperiences } from '../services/api'

function formatPeriod(startDate, endDate) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' })
  const start = formatter.format(new Date(startDate))
  const end = endDate ? formatter.format(new Date(endDate)) : 'Atual'
  return `${start} - ${end}`
}

function ExperiencesPage() {
  const { t } = useTranslation()
  const [experiences, setExperiences] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    async function loadExperiences() {
      try {
        const data = await fetchExperiences()
        setExperiences(data)
        setHasError(false)
      } catch {
        setExperiences(fallbackExperiences)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadExperiences()
  }, [])

  const sortedExperiences = useMemo(
    () => [...experiences].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
    [experiences],
  )

  if (isLoading) {
    return (
      <Stack align="center" py="xl">
        <Loader />
        <Text>{t('common.wakingServer')}</Text>
      </Stack>
    )
  }

  return (
    <Stack>
      <Title order={1}>{t('experiences.title')}</Title>
      {hasError ? (
        <Alert icon={<IconAlertCircle size={16} />} color="yellow">
          {t('common.apiFallback')}
        </Alert>
      ) : null}
      <Grid>
        {sortedExperiences.map((experience) => (
          <Grid.Col key={experience.id} span={{ base: 12, md: 6 }}>
            <Card withBorder h="100%">
              <Stack gap="xs">
                <Title order={4}>{experience.organization}</Title>
                <Text fw={500}>{experience.role}</Text>
                <Text c="dimmed">{formatPeriod(experience.startDate, experience.endDate)}</Text>
                <Text>{experience.description}</Text>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  )
}

export default ExperiencesPage
