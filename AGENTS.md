# Repository Guidelines

This project hosts a GitHub Pages site built with Jekyll using the **minimal-mistakes** theme.

## Building the Site
- Install Ruby dependencies with `bundle install`.
- Build locally using `bundle exec jekyll build`.
- The theme normally uses the `jekyll-include-cache` plugin, but cached includes have been replaced with normal {% raw %}`{% include %}`{% endraw %} tags so the site can build without extra plugins.

## Java Playground
- A basic Spring Boot project lives under `src/main/java`.
- Running `mvn test` may fail due to blocked network access when resolving dependencies.

Keep changes minimal and do not create new branches.
