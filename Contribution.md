# Contributing to ShopSphere

First off, thank you for considering contributing to ShopSphere! It's people like you who make ShopSphere such a great tool. This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/shopsphere.git
   ```
3. Set up the development environment as described in the README.md
4. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Setting Up Development Environment
1. Ensure you have all prerequisites installed:
   - Node.js (>=14.x)
   - MongoDB
   - Git
2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```
3. Set up environment variables as specified in example.env
4. Start the development server:
   ```bash
   # Starts both frontend and backend using concurrently
   npm run dev

   # OR
   # Starts frontend using vite
   cd frontend
   npm run dev

   # AND
   # Starts backend using nodemon
   cd ../backend
   npm run dev
   ```

### Making Changes
1. Work on your feature or bug fix
2. Follow the project's coding style and conventions:
   - Use meaningful variable and function names
   - Write clear commit messages
   - Comment your code when necessary
   - Follow the existing code structure
3. Test your changes thoroughly

### Commit Guidelines
- Use clear and meaningful commit messages
- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Example: `feat(auth): add password reset functionality`

### Pull Request Process
1. Update your fork to include the latest changes from the main repository
2. Push your changes to your fork
3. Create a Pull Request (PR) to the main repository
4. In your PR description:
   - Clearly describe the changes
   - Link any related issues
   - Include screenshots for UI changes
   - List any breaking changes
   - Mention any additional dependencies

## What to Contribute

### Current Priority Areas
- Shopping cart functionality implementation
- Secure payment integration
- Admin panel development
- Mobile responsiveness improvements
- Bug fixes and performance optimizations

### Types of Contributions
- Bug fixes
- New features
- Documentation improvements
- Performance optimizations
- UI/UX enhancements

## Style Guidelines

### JavaScript/React
- Use ES6+ features
- Follow React best practices
- Use functional components and hooks
- Maintain proper component structure
- Use meaningful component and variable names

### CSS/TailwindCSS
- Use Tailwind utility classes appropriately
- Maintain responsive design principles
- Keep styles modular and reusable

### Git Workflow
1. Create a feature branch
2. Make your changes
3. Write or update tests
4. Update documentation
5. Submit a pull request

## Testing

- Ensure all tests pass before submitting PR
- Test across different browsers and devices

## Documentation

- Update README.md if needed
- Document new features
- Update API documentation
- Include JSDoc comments for functions
- Add inline comments for complex logic

## Getting Help

- Create an issue for bugs or feature requests
- Join our community discussions
- Contact maintainers at [anwishtaghosh@gmail.com]
- Check existing issues and PRs before creating new ones

## Recognition

Contributors will be added to the Contributors section in the README.md file automatically through the contributors-img.web.app integration.

Thank you for contributing to ShopSphere! Your efforts help make this project better for everyone.