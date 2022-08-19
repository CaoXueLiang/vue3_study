const nums = [10, 9, 2, 5, 3, 7, 101];
const anotherNums = [10, 9, 2, 5, 3, 7, 101, 18, 4, 8, 6, 12];

/**
 * 方法一：动态规划
 */

function lengthOfLIS(nums) {
  const len = nums.length;
  if (len === 0) {
    return 0;
  }
  if (len === 1) {
    return 1;
  }
  let dp = new Array(len);
  dp.fill(1);

  let maxans = 1;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxans = Math.max(maxans, dp[i]);
  }

  return maxans;
}

console.log("lengthOfLIS", lengthOfLIS(nums));

/**
 * 方法二：贪心 + 二分查找
 */

function lengthOfLIS_fast(nums) {
  const len = nums.length;
  if (len === 0) {
    return 0;
  }
  if (len === 1) {
    return 1;
  }
  let tail = new Array(len);
  let end = 0;
  tail[0] = nums[0];
  for (let i = 0; i < len; i++) {
    if (nums[i] > tail[end]) {
      end++;
      tail[end] = nums[i];
    } else {
      let left = 0;
      let right = end;
      while (left < right) {
        let mid = parseInt(left + (right - left) / 2);
        if (tail[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      tail[left] = nums[i];
    }
  }

  console.log("--tail--", tail);
  end++;
  return end;
}

console.log("---lengthOfLIS_fast---", lengthOfLIS_fast(anotherNums));
