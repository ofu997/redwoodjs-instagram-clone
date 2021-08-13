# Memofolio

An Instagram clone.

Preview:

![an image of a social media app in a smartphone frame](https://lh3.googleusercontent.com/-AO4ZRiYVu63ZoxZT7URQKVXzaF69OxjDVMYO5Vfx8jBI54cmxADYadTkW3AzBl5za2zR0jBPqCfrhEQntA-X0jjNh-_80GSBSG_H7zPWfdIvmdzY8wRLKnU3T_NkIrS0TsRvTmddmb2h-u960SmegqbV9Ds0HgfXkzpHul_WHtwmQz-3Rmh_AI21dNcjTGmrRf_DoyW4QKvVG27x7t9uLBhpOM4WD9cC3o1DZsyb16lGe4pqG1y8C1al-prU-TImf_88ur9ZMdWyA1XcZal-z3iZYaMGtyEECDiQq_47aqsFEoHJxiBisvMV8HPj_TfvEomO-K3rM1d8iYrR1cJHrajl-c7qsYV8Bw55EgPc1cblrufVuoXBBleBy58ON49uIxObZMAUj1TaMEFQVBiNU5PlRWSUGgnT2bQbNSSQQ7JMml3wzQgW6CuuNCGgBwFkru6isiwjDeNtm7umXgKCh8JpZ9_3yFkSW6hp4yHkD-olEDMW10JKY4ixB8YDhtEcheHx44t9iS4lKUbHqLa7QideSz3rFC4-PXQPkU1N2yUWC0_ee2m344iCViI4SRgk2YXgVTM7mlLz8uQDc7Dw-FoUWS7qtIhiWnBbGTjTqY6AIzAW-p7Xpm1mqWaxrdGal---lgwa7o2gGhkD43MxIqItx3Dx9iZDVyLs1yGEUpWIfeShAe-ZD_t0c0i62p8OYBig8agnplHQQcoCepiawITNA=w463-h970-no?authuser=0)


# Redwood

> **WARNING:** RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase.

## Migrations

After a change in the schema.prisma file, create and apply a migration with the command
```yarn rw prisma migrate dev```

[Migrations link](https://www.prisma.io/docs/concepts/components/prisma-migrate)

## Getting Started
- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

