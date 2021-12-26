import React from 'react'
import {
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiSwitch,
  EuiTitle
} from '@elastic/eui'
import {useTheme} from '../context/ThemeContext/ThemeContext'
import {AppTheme} from '../types'

export default function PageContainer(props: {children: React.ReactNode}) {
  const {theme, toggleTheme} = useTheme()
  const isDark = theme === AppTheme.DARK
  return (
    <EuiPage>
      <EuiPageBody component='div'>
        <EuiPageContent>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size='l'>
                <h1>
                  Demo App: Country List{' '}
                  <a href='https://github.com/Romroot/sample-apollo-elastic-ui-app' target='_blank' rel='noreferrer'>
                    <EuiIcon type='logoGithub' size='xl' color='black' />
                  </a>
                </h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiSwitch label='Dark Theme' onChange={toggleTheme} checked={isDark} />
            </EuiPageHeaderSection>
          </EuiPageHeader>

          <EuiPageContentBody>
            <EuiSpacer size='xl' />
            {props.children}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}
