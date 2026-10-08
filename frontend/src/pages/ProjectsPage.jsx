import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Timeline,
  Title,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { fallbackProjects } from '../data/projects'
import { fetchProjects } from '../services/api'

function ProjectsPage() {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects()
        setProjects(data)
        setHasError(false)
      } catch {
        setProjects(fallbackProjects)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
    [projects],
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
      <Title order={1}>{t('projects.title')}</Title>
      {hasError ? (
        <Alert icon={<IconAlertCircle size={16} />} color="yellow">
          {t('common.apiFallback')}
        </Alert>
      ) : null}
      <Timeline active={sortedProjects.length} bulletSize={24} lineWidth={2}>
        {sortedProjects.map((project) => (
          <Timeline.Item key={project.id} title={project.name}>
            <Card withBorder mt="sm">
              <Stack>
                <Image src={project.imageUrl} alt={project.name} radius="sm" />
                <Text>{project.description}</Text>
                <Group>
                  {project.technologies.map((technology) => (
                    <Badge key={technology}>{technology}</Badge>
                  ))}
                </Group>
                <Button
                  component="a"
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                >
                  {t('projects.viewRepository')}
                </Button>
              </Stack>
            </Card>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  )
}

export default ProjectsPage
