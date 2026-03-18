# Spec: MultiPolygon Support

## Summary
Add support for GeoJSON `MultiPolygon` geometry type in addition to existing `Polygon` support.

## Motivation
Some administrative boundaries use MultiPolygon (e.g., islands, enclaves). Currently only Polygon is handled.

## Acceptance Criteria
- [ ] `reverseGeocode()` correctly matches points inside MultiPolygon features
- [ ] Existing Polygon behavior unchanged
- [ ] Tests cover MultiPolygon cases
