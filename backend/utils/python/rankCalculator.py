def calculate_rank(scores):
    """
    Calculate ranks based on scores.
    
    Parameters:
    scores (list): A list of scores to rank.

    Returns:
    list: A list of ranks corresponding to the input scores.
    """
    sorted_scores = sorted(scores, reverse=True)
    ranks = [sorted_scores.index(score) + 1 for score in scores]
    return ranks

if __name__ == "__main__":
    # Example usage
    scores = [100, 90, 90, 80, 70]
    ranks = calculate_rank(scores)
    print("Scores:", scores)
    print("Ranks:", ranks)