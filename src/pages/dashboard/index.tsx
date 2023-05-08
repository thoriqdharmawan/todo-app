import Card from "@/components/Card"
import Section from "@/components/Section"
import Stack from "@mui/material/Stack"

export default () => {
  return (
    <Section>
      <Stack direction="row" gap="26px 20px" flexWrap="wrap">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Stack>
    </Section>
  )
}