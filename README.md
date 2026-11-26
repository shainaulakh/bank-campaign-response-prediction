# Bank Campaign Response Prediction

**Can a bank identify likely term-deposit subscribers before a marketing call begins?** This classification project uses historical campaigns from a Portuguese bank to study that decision. The eventual dashboard will let a visitor score an example contact and see how changing the decision cutoff affects missed subscribers and unnecessary calls.

**Current milestone · 1 of 6.** The executed notebook loads the full dataset, checks the target and defines which information is available at prediction time. [Explore the master notebook](bank_campaign_response_prediction.ipynb)

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
| 2 · Explore the campaigns | Reserve later records, measure class balance and explore earlier campaigns | Planned |
| 3 · Prepare the inputs | Build a preprocessing pipeline for numeric fields, categories and unknown values | Planned |
| 4 · Compare models | Evaluate a simple baseline and logistic regression on validation records | Planned |
| 5 · Choose an operating cutoff | Compare precision, recall and call volume, then report held-out results | Planned |
| 6 · Demonstrate the predictor | Publish an interactive dashboard with example inputs, response scores and an adjustable cutoff | Planned |

## Reproduce Part 1

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
