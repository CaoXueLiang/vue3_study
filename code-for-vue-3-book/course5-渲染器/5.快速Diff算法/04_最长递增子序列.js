// 子序列：是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
// 例如：[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列

const num1 = [0, 1, 0, 3, 2, 3];
// 最长递增子序列是 [0,1,2,3]

const num2 = [7, 7, 7, 7, 7, 7];
// 最长递增子序列是[7]

const nums = [10, 9, 2, 5, 3, 7, 101];
// 最长递增子序列是 [2,3,7,101]

/**
 * 方法一：动态规划
 * dp[i] 表示以 nums[i] 为最后一个元素时，最长上升子序列的数量
 * 我们必然要从 0 ~ i 元素中，查找所有小于 nums[i] 的元素。
 * 然后再在这些元素中，找到最长上升子序列数长度最大的元素 nums[j], 而我们要求的dp[i] = dp[j] + 1
 *
 * 1、首先 dp[0] 默认等于 1，尽管只有一位，也是需要自立门户，长度为1的。
 * 2、接下来要获得 dp[1] 的值，nums[1] 在其前面没有找到比自己小的元素，因此只能自立门户，dp[1] = 1。
 * 3、dp[2]的值，num[2] 在其前面没有比自己小的值，因此 dp[2] = 1
 * 4、num[3]的值为 5，前面num[2]比自己小，所以dp[3] = dp[2] + 1 = 2
 * 5、num[4]的值为 4，前面num[2]比自己小，所以dp[4] = dp[2] + 1 = 2
 * 6、num[5]的值为 7，前面的 num[2]、num[3]、num[4]比自己小，dp[5] = max(dp[2],dp[3],dp[4]) + 1 = 3
 * 7、num[6]的值为101，前面的 num[0]、num[1]、num[2]、num[3]、num[4]、num[5]比自己小，dp[6] = max(dp[0],dp[1],dp[2],dp[3],dp[4],dp[5]) + 1 = 3 + 1 = 4
 */

function lengthOfLIS(nums) {
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return 1;
  }
  const dp = new Array(nums.length);
  dp.fill(1); // 用1进行填充

  let maxans = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxans = Math.max(maxans, dp[i]);
  }
  return maxans;
}
console.log(lengthOfLIS(nums));

const anotherNums = [10, 9, 2, 5, 3, 7, 101, 18, 4, 8, 6, 12];

/***
 * 方法二：贪心 + 二分查找
 *
 * 创建一张表格（矩阵），表格的行数为数组的元素个数，和列数可以 “动态” 方式追加
 * 当数组是严格上升数组的时候，这张表格的下三角部分会被填满。
 * 每一行记录一个 “上升子序列”，规则如下：
 * 第1行记录长度为1的一个上升子序列
 * 第2行记录长度为2的一个上升子序列
 * ......
 * 第n行记录长度为n的一个上升子序列
 * 这些子序列的共同特点是：它们的 “结尾” 是所有相同长度的 “上升子序列” 里面最小的
 *
 */

function lengthOfLIS_fast(nums) {
  let len = nums.length;
  if (len <= 1) {
    return len;
  }

  // tail 数组的定义：长度为 i + 1 的上升子序列的末尾最小是几
  let tail = new Array(len);
  // 遍历第 1 个数，直接放在有序数组 tail 的开头
  tail[0] = nums[0];
  // end 表示有序数组 tail 的最后一个已经赋值元素的索引
  let end = 0;

  for (let i = 1; i < len; i++) {
    // 【逻辑1】比 tail 数组实际有效的末尾的那个元素还大
    if (nums[i] > tail[end]) {
      // 直接添加在那个元素的后面，所以 end 先加 1
      end++;
      tail[end] = nums[i];
    } else {
      // 使用二分查找法，在有序数组 tail 中
      // 找到第一个大于等于 num[i] 的元素，尝试让那个元素更小
      let left = 0;
      let right = end;
      while (left < right) {
        let mid = parseInt(left + (right - left) / 2);
        if (tail[mid] < nums[i]) {
          // 下一轮搜索的区间是 [mid + 1..right]
          left = mid + 1;
        } else {
          // 下一轮搜索的区间是 [left..mid]
          right = mid;
        }
      }

      // 走到这里是因为【逻辑1】的反面，因此一定能找到第一个大于等于 num[i] 的元素
      // 因此，无需再单独判断
      tail[left] = nums[i];
    }
    printArray(nums[i], tail);
  }
  // 此时 end 是有序数组 tail 最后一个元素的索引
  // 题目要求返回的是长度，因此 +1 后返回
  end++;
  return end;
}

function printArray(num, tail) {
  console.log(`当前数字：${num}`);
  console.log(`当前 tail 数组：`, tail);
}

console.log(lengthOfLIS_fast(anotherNums));
