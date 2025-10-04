# Lighthouse CI Variance and Reliability

## The Problem

Lighthouse scores can vary significantly between runs, especially in CI environments. This is a well-known issue that affects all automated performance testing.

### Common Variance Sources

1. **System Resources**
   - CPU throttling variations
   - Memory availability
   - Disk I/O speed
   - Network conditions

2. **CI Environment Factors**
   - Shared runners with varying load
   - Docker container overhead
   - Background processes
   - Network latency to preview server

3. **Browser Timing**
   - Paint timing variations
   - JavaScript execution timing
   - Resource loading order
   - Cache behavior

### Example Variance

In our project, we've observed:
- **Local runs**: Consistently 99/100
- **CI runs**: Range from 92-99/100 (±7 points)
- **Median of 3 runs**: Consistently 96-99/100 (±3 points)

## Our Solution: Median of 3 Runs

### Why Median?

The median is more reliable than:
- **Single run**: Can be unlucky with system load
- **Average**: Skewed by outliers (one bad run affects result)
- **Best of 3**: Not representative of typical performance

### Implementation

```yaml
- name: Run Lighthouse audit (3 runs for median)
  run: |
    echo "Running Lighthouse 3 times to get median score..."
    pnpm run audit
    cp lighthouse-report.json lighthouse-report-1.json
    sleep 5
    pnpm run audit
    cp lighthouse-report.json lighthouse-report-2.json
    sleep 5
    pnpm run audit
    cp lighthouse-report.json lighthouse-report-3.json

- name: Calculate median Lighthouse scores
  run: |
    # Extract scores from all 3 runs
    PERF1=$(jq '.categories.performance.score * 100 | round' lighthouse-report-1.json)
    PERF2=$(jq '.categories.performance.score * 100 | round' lighthouse-report-2.json)
    PERF3=$(jq '.categories.performance.score * 100 | round' lighthouse-report-3.json)
    
    # Calculate median (sort and pick middle value)
    PERF=$(echo -e "$PERF1\n$PERF2\n$PERF3" | sort -n | sed -n '2p')
```

### Thresholds

We use conservative thresholds that account for CI variance:
- **Performance**: 90+ (median)
- **Accessibility**: 90+ (median)
- **Best Practices**: 95+ (median)
- **SEO**: 95+ (median)

These thresholds are:
- Below our typical scores (99, 92, 100, 100)
- But above "good" performance standards
- Prevent false negatives from variance

## Industry Best Practices

### Google's Recommendations

From [Lighthouse CI documentation](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md):

1. **Run multiple times**: 3-5 runs recommended
2. **Use median**: More stable than mean
3. **Set conservative thresholds**: Account for ±5 point variance
4. **Monitor trends**: Watch for regressions over time

### Alternative Approaches

#### 1. Lighthouse CI Service
Google offers a Lighthouse CI server for trend tracking:
- Stores historical data
- Shows performance over time
- Detects regressions automatically

**Pros**: Professional solution, detailed trends  
**Cons**: Additional infrastructure, complexity

#### 2. WebPageTest
Run tests from multiple locations:
- More realistic conditions
- Geographic distribution
- Slower (minutes vs seconds)

**Pros**: Real-world conditions  
**Cons**: Much slower, external dependency

#### 3. Single Run with Wide Thresholds
Use very conservative thresholds (e.g., 85+):
- Faster CI (one run only)
- Less reliable

**Pros**: Fast  
**Cons**: Misses subtle regressions

### Why We Chose Median of 3

Balance of:
- **Reliability**: Median filters out outliers
- **Speed**: 3 runs ≈ 2-3 minutes total
- **Simplicity**: No external services needed
- **Cost**: Uses GitHub Actions only

## Understanding CI Failures

### When CI Fails

If the check fails:

1. **Check all 3 runs**: Look at GitHub Actions summary
   ```
   | Category | Run 1 | Run 2 | Run 3 | Median |
   | Performance | 88 | 95 | 97 | 95 ✅ |
   ```

2. **Look for patterns**:
   - All runs low → Real regression
   - One run low → Variance (median handles it)
   - Median below threshold → Investigation needed

3. **Run locally**:
   ```bash
   pnpm run audit:check
   ```
   If local passes but CI fails → likely variance

### Real Regressions vs Variance

**Real Regression** (investigate):
- All 3 runs significantly lower
- Median dropped by 5+ points
- Consistent pattern across categories

**Variance** (safe to merge):
- Individual runs vary widely (92, 99, 96)
- Median still above threshold
- Other metrics stable

## Monitoring Over Time

### Historical Data

GitHub Actions saves:
- All 3 report JSONs (90 days)
- CSV with median scores (365 days)
- Artifacts viewable in Actions tab

### Trend Analysis

To check for gradual degradation:

1. Download historical CSVs from artifacts
2. Plot scores over time
3. Look for downward trends
4. Investigate commits where drops occurred

### Example Analysis

```bash
# Download lighthouse-scores-history artifacts
# Combine into single CSV
cat lighthouse-scores-*.csv > all-scores.csv

# Plot with gnuplot or import to spreadsheet
```

## Best Practices for Developers

### Before Merging

1. **Check the median**: Focus on median, not individual runs
2. **Compare to baseline**: Has median dropped significantly?
3. **Run locally**: If unsure, test on your machine
4. **Review changes**: Did you add large assets? Complex animations?

### After Optimization

1. **Expect variance**: ±3 points is normal
2. **Watch trends**: Multiple PRs with small drops = problem
3. **Document changes**: Note any intentional performance trade-offs

### Debugging CI Failures

If Lighthouse fails in CI but passes locally:

1. **Check system load**: Was CI runner busy?
2. **Review timing**: Did tests run during peak hours?
3. **Re-run check**: GitHub Actions "Re-run failed jobs"
4. **Check all 3 runs**: One bad run with good median = OK

## Conclusion

**Lighthouse variance is normal and expected.**

Our median-of-3 approach:
- ✅ Reduces false negatives from variance
- ✅ Catches real regressions reliably
- ✅ Balances speed and accuracy
- ✅ Industry-standard practice

**Key takeaway**: Focus on the median score and trends over time, not individual runs.
