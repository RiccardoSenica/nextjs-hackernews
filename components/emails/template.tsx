import { Container } from '@react-email/container';
import { Html } from '@react-email/html';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Footer } from './components/footer';

type EmailProps = {
  title: string;
  body: JSX.Element;
};

export default function Email({ title, body }: EmailProps) {
  return (
    <Html>
      <Section
        className='mx-auto w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg'
        style={main}
      >
        <Container style={container}>
          <h1 className='mt-4 text-center text-3xl font-bold'>{title}</h1>
          <Text style={paragraph}>{body}</Text>
        </Container>
        <Footer />
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff'
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px'
};

const paragraph = {
  fontSize: '16px',
  marginBottom: '16px'
};
