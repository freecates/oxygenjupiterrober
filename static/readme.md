**Follwing the impressive and astonished world expasion, Oxygen Area has begun to explore the Space! They have sent its first robot to Jupiter!**

---

## Technology stack

### React + NextJS + StyledComponents

- React 16.8 in order to use and try Hooks.
- NextJS to easy bootstrap the project
- Create NextJ. A cli to start faster with NextJS
- StyleComponents to gain performance and avoid blocking above the fold.

## App architecture

- Two pages (two routes)
- index, where everyting happens
- about, where we read the README.md
- Three main components: mainapp, jupiter and robot
  - Mainapp: its a function component made with hooks (useState and useRef). It loads the stage, the panel control interface, our planet and our robot. The panel control it's a series of inputs and buttons that takes care of: - the start position (with a regex pattern and a check validity) - the commands to be executed, that will move our robot through Jupiter

... to be continued
