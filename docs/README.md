# Aelonyori Documentation

This directory is the canonical home for project documentation.

## Documentation Sets

### User Documentation

- [User Guide](user/user-guide.md)
- [UI Controls Reference](user/ui-controls-reference.md)

### Technical Documentation

- [Architecture Overview](technical/architecture-overview.md)
- [Code Map and Important Sections](technical/code-map.md)
- [config.json Reference](technical/config-json-reference.md)
- [defaults.json Reference](technical/defaults-json-reference.md)
- [Synthesis and Audio Engine](technical/synthesis.md)

### Historical / Legacy Notes

- [Legacy config notes](archive/config.legacy.md)
- [Legacy synthesis notes](archive/synthesis.legacy.md)

## How To Use This Documentation

- Start with the user guide if you are operating the app.
- Start with architecture overview and code map if you are editing code.
- Use config and defaults references when tuning behavior without changing source files.
- Use the synthesis document for audio internals and future implementation planning.

## Scope

This docs tree covers:

- Runtime architecture and state flow.
- DAW and sampler behavior.
- Transport, sequencing, and scheduling model.
- Configuration and defaults systems.
- Audio synthesis implementation and extension opportunities.
