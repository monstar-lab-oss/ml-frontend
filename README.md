# ReactJS Boilerplate

## Roadmap

Our roadmap for the ReactJS Boilerplate is where you can learn about what features we're working on.

### Development environment

- Build tool
  - [x] Vite
    - Optimisation of Minify code in production mode
- Coding Standards and Guidelines (Statically analyzes our codes)
  - [ ] ESLint with our rules
  - [ ] Prettier
- Testing framework
  - [x] Jest
  - [ ] React Testing Library
  - [ ] React Hooks Testing Library
  - [ ] Storybook
    - [x] base
    - [ ] msw
    - [ ] state management
    - [ ] router
    - [ ] css
    - [ ] i18n
- Mock API server
  - [x] msw

### Application design

- State management
  - Client state
    - [ ] useContext
      - Need to have logic to prevent unnecessary rerender
    - [ ] Use state management libraries
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
  - Frameworks
    - Tailwind CSS
    - Chakra UI
    - Material UI
  - Animations

### Application security

- [Authentication](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/15)
- [Security](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/9)

### DX

- CI / CD
- [REST and GraphQL](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/14)
- [Deployment](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/5)
  - Deploy to Amazon S3 + CloudFront
- Update Dependencies Safely and Automatically
  - [ ] Renovate

### UX

- [ ] [Definition of browser support](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/2)
- [x] Internationalization
  - [x] [i18next](https://www.i18next.com/)
- [SEO support](https://github.com/monstar-lab-oss/reactjs-boilerplate/discussions/1)

### Performance

- Optimization
  - [ ] Get a 100 % Lighthouse Performance Score
