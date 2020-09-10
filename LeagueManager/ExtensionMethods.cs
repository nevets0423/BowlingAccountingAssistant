using System;
using System.Collections.Generic;
using System.Linq;

namespace LeagueManager {
    public static class ExtensionMethods {
        public static IList<T> Clone<T>(this IList<T> listToClone) where T : ICloneable {
            return listToClone.Select(item => (T)item.Clone()).ToList();
        }

        public static IList<T> Copy<T>(this IList<T> listToClone) {
            if( listToClone == null) {
                return null;
            }
            return new List<T>(listToClone);
        }
    }
}
