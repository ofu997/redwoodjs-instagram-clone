# Memofolio

An Instagram clone.

Preview:

![an image of a social media app in a smartphone frame](https://lh3.googleusercontent.com/K5te7AYCaLI1-bKX-6dRT-E_L9sgVzW9XO56JGE4SJXP4YNGp-3PYQTAVIJp_xm2YmJ17J98dTlL8ySuevTCu3rxKKmE9YEM5ncP1FSwsxqr543ic9O1gVNBnGHgNJSHMiY0MucNbe0ZhtguprD0EjKfKeV0CQ0Ij1Ll8b2RrrFArZpHvP5nqocfanGtHrHn6E8UOMMCuNgO2X52IguydHbf21MU9KAz2hnV1NEzIO7KXQkwiDESLYqJ5i-1vkuNbxc-v_pSkd3uAiGR_RoJo2EsXsiSBYJvfsDEVZ9HY3gD4PiQ5Ezgic1m5xc8e-gTf-EYkeLN_N3ODkiYD4Uv5wJVk0-7xpido-rF8xIm_u10wbp7A46Stqr4xyC4tWcYBh9O9_8qMEosHqaBDJGzOw58mqpkb6UW7LzffEA7ZewBTEVfux2OmPpSio510gBLA3tt3GX46gNS4hn7rm75XapY-dOKV_K_3sGwweeV1hOsz7-BZHIoh_Mwem4mUC8tg-vH1GBvlFn-TMMMEzsdMwI0HePA8Ik2h7lcVlyhI17trLoImJKy7IDMFyJ-BhcFRYKJ6vGN5HMVuhA8g2lmgGEHVesRkTpCjKDbyJjpMTvwpfNl1065QLCDO-i4jw3qi_NCMSxVL3PMNOM-BrUN-l7wBb8z_u1FHnNkM6jSO2D6CamT0SQLmxuj0OsySVD25M7boda2rUjLeYkEHfRKNfigrw=w463-h970-no?authuser=0)


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

