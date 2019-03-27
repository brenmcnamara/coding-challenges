import UIKit

func findRareOrder(words: [String]) -> String {
    // Create intermediate data structure to define DAG ordering of letters.
    var dag: [Character: Set<Character>] = [:]

    // Iterate all characters and create an empty set for
    // each of them.
    for word in words {
        for char in word {
            if dag[char] == nil {
                dag[char] = []
            }
        }
    }

    // Generate the DAG.
    for (index, currWord) in words.enumerated() {
        if index == 0 {
            continue
        }
        let prevWord = words[index - 1]

        for (first, second) in zip(prevWord, currWord) {
            if first == second {
                continue
            }
            dag[second]!.insert(first)
            break
        }
    }
    
    // Pull elements out of the dag and construct the ordering.
    var ordering = ""

    while !dag.isEmpty {
        // Pass 1: Find a word that has no parents.
        var nextChar: Character? = nil
        for (char, parents) in dag {
            if parents.isEmpty {
                ordering = ordering + String(char)
                nextChar = char
                break
            }
        }

        dag.removeValue(forKey: nextChar!)

        for key in dag.keys {
            dag[key]!.remove(nextChar!)
        }
    }

    return ordering
}

findRareOrder(words: ["XWY", "ZX", "ZXY", "ZXW", "YWWX"])

