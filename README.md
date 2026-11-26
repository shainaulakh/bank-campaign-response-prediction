# Bank Campaign Response Prediction

**Can a bank identify likely term-deposit subscribers before a marketing call begins?** This classification project uses historical campaigns from a Portuguese bank to study that decision. The eventual dashboard will let a visitor score an example contact and see how changing the decision cutoff affects missed subscribers and unnecessary calls.

**Current milestone · 2 of 6.** The executed notebook defines the pre-call decision and explores response patterns in the earlier training records. [Explore the master notebook](bank_campaign_response_prediction.ipynb)

## The prediction contract

| Decision | Definition |
|---|---|
| When to score | Immediately before the current call starts |
| What to predict | Whether the contacted customer subscribes to a term deposit (`y`, yes/no) |
| Starting clues | Job category, number of contacts before this campaign and previous campaign outcome |
| Field to exclude | `duration` records the length of the current call. It becomes known only after the call. |
| Scope | Response among previously contacted customers. Estimating whether a call *causes* a subscription would require different evidence. |

## Six project milestones

| Part | Deliverable | Status |
|---|---|---|
| 1 · Define the prediction | Document the source and target, inspect the schema and establish a pre-call feature list | Complete |
| 2 · Explore the campaigns | Reserve later records, measure class balance and explore earlier campaigns | Complete |
| 3 · Prepare the inputs | Build a preprocessing pipeline for numeric fields, categories and unknown values | Planned |
| 4 · Compare models | Evaluate a simple baseline and logistic regression on validation records | Planned |
| 5 · Choose an operating cutoff | Compare precision, recall and call volume, then report held-out results | Planned |
| 6 · Demonstrate the predictor | Publish an interactive dashboard with example inputs, response scores and an adjustable cutoff | Planned |

## Part 2 findings

The date-ordered split assigns 28,831 records to training, 6,178 to validation and 6,179 to testing. All response rates below come from training.

| Training group | Subscriptions / records | Response rate |
|---|---:|---:|
| All records | 1,606 / 28,831 | 5.57% |
| Previous success | 7 / 50 | 14.00% |
| Previous failure | 56 / 952 | 5.88% |
| No previous outcome | 1,543 / 27,829 | 5.54% |

Always predicting “no” would be 94.43% accurate on training records while missing every subscriber. This motivates reporting precision and recall when models are compared. The previous-success group is small, so its higher observed rate should be interpreted cautiously.

## Reproduce Parts 1 and 2

Clone the repository and run these commands in a Windows Miniconda prompt:

```shell
git clone https://github.com/shainaulakh/bank-campaign-response-prediction.git
cd bank-campaign-response-prediction
conda create -n bank-campaign python=3.11 -y
conda activate bank-campaign
python -m pip install -r requirements.txt
mkdir data
curl.exe -fL "https://archive.ics.uci.edu/static/public/222/bank+marketing.zip" -o data/bank-marketing.zip
code .
```

On macOS or Linux, use `curl` in place of `curl.exe`. Open the master notebook from the project root, select the **bank-campaign** kernel and choose **Run All**. The notebook reads the CSV inside the archive directly. Expected dimensions are **41,188 rows × 21 columns**, including the target.

## Data and attribution

The notebook uses the date-ordered `bank-additional-full.csv` variant, covering May 2008 through November 2010. These results will describe historical phone campaigns at one institution. A modern campaign would need new validation.

S. Moro, P. Rita and P. Cortez, *Bank Marketing*, UCI Machine Learning Repository. [Dataset and documentation](https://doi.org/10.24432/C5K306) · [Dataset licence · CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
