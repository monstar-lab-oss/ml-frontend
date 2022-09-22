# ReactJS Boilerplate

## Roadmap

Our roadmap for the ReactJS Boilerplate is where you can learn about what features we're working on.

### Development environment

- Build tool
  - [x] Vite
    - Optimisation of Minify code in production mode
- Coding Standards and Guidelines (Statically analyzes our codes)
  - [ ] ESLint with our rules
  - [x] Prettier
- Mock API server
  - [x] msw

### Testing

- Visual regression testing
  - [x] Storybook
- Unit testing
  - [x] Jest
  - [x] React Testing Library
  - [ ] React Hooks Testing Library
- End-to-end testing
  - [x] Playwright

### Application design

- API Interface
  - [REST and GraphQL](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/14)
- State management
  - Client state
    - [x] useContext
      - Need to have logic to prevent unnecessary rerender
    - [x] Use state management libraries
      - [x] zustand
      - Continued consideration of other proposals
  - Server state
    - [x] React Query
  - Typescript rules
    - [ ] [Interface vs Types](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/20)
- Routing for SPA
  - [x] [wouter](https://github.com/molefrog/wouter)
- Validate forms in React
  - [x] [React Hook Form](https://react-hook-form.com)
- CSS
  - Preprocessors
    - [x] Sass
    - PostCSS
  - Animations
- Multi Language
  - [x] i18n

### Application security

- [Authentication](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/15)
- [Security](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/9)

### DX

- CI / CD
- [Deployment](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/5)
  - Deploy to Amazon S3 + CloudFront
- Update Dependencies Safely and Automatically
  - [x] Renovate

### UX

- [ ] [Definition of browser support](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/2)
- [x] Internationalization
  - [x] [i18next](https://www.i18next.com/)
- [SEO support](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/1)

### Performance

- Optimization
  - [ ] Get a 100 % Lighthouse Performance Score
