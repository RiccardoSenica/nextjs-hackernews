import { getSayings } from '@utils/getSayings';
import { textTruncate } from '@utils/textTruncate';
import { NewsType } from '@utils/validationSchemas';
import Template from './Template';

export default function NewsletterTemplate(stories: NewsType[]) {
  return {
    subject: `What's new from the Hackernews forum?`,
    template: (
      <Template
        title={`Here is something 
              ${getSayings[Math.floor(Math.random() * getSayings.length)]}!`}
        body={
          <div>
            {stories.map(story => {
              return (
                <div
                  key={story.id}
                  style={{
                    marginTop: '2rem',
                    marginBottom: '2rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    backgroundColor: `white`,
                    color: '#111827',
                    boxShadow: '0 16px 32px 0 rgba(0, 0, 0, 0.05)'
                  }}
                  data-v0-t='card'
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.375rem',
                      paddingTop: '1.5rem',
                      paddingLeft: '1.5rem',
                      paddingRight: '1.5rem'
                    }}
                  >
                    <h3>{story.title}</h3>
                    <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                      by {story.by}
                    </p>
                  </div>
                  {story.text && (
                    <div
                      style={{
                        paddingLeft: '1.5rem',
                        fontSize: '1rem',
                        paddingRight: '1.5rem'
                      }}
                    >
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            story.text.length > 500
                              ? textTruncate(story.text, 500) + '...'
                              : story.text
                        }}
                      />
                    </div>
                  )}
                  {story.url && (
                    <div
                      style={{
                        paddingBottom: '1.5rem',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        textAlign: 'right',
                        fontWeight: 'bold'
                      }}
                    >
                      <a href={story.url}>Read more</a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        }
      />
    )
  };
}
