import { useState } from 'react'
import {
  Anchor,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'
import { sendContactMessage } from '../services/api'

function ContactPage() {
  const { t } = useTranslation()
  const [isSending, setIsSending] = useState(false)

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : t('contact.validation.nameRequired')),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('contact.validation.emailInvalid')),
      message: (value) =>
        value.trim().length >= 10 ? null : t('contact.validation.messageMinLength'),
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      setIsSending(true)
      await sendContactMessage(values)
      notifications.show({
        title: t('contact.successTitle'),
        message: t('contact.successMessage'),
        color: 'green',
      })
      form.reset()
    } catch {
      notifications.show({
        title: t('contact.errorTitle'),
        message: t('contact.errorMessage'),
        color: 'red',
      })
    } finally {
      setIsSending(false)
    }
  })

  return (
    <Stack>
      <Title order={1}>{t('contact.title')}</Title>
      <Text>{t('contact.description')}</Text>

      <Group>
        <Anchor href="mailto:arthur@example.com">E-mail</Anchor>
        <Anchor href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </Anchor>
        <Anchor href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Anchor>
        <Anchor href="https://github.com/devarthuraugusto" target="_blank" rel="noopener noreferrer">
          GitHub
        </Anchor>
      </Group>

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput label={t('contact.form.name')} withAsterisk {...form.getInputProps('name')} />
          <TextInput
            label={t('contact.form.email')}
            withAsterisk
            {...form.getInputProps('email')}
          />
          <Textarea
            label={t('contact.form.message')}
            withAsterisk
            minRows={5}
            {...form.getInputProps('message')}
          />
          <Button type="submit" loading={isSending}>
            {t('contact.form.send')}
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}

export default ContactPage
