package nguyen.tan.hung.config;

import java.util.HashMap;
import java.util.Map;

public class GlobalConfig {
    public final static int limit=1;
    public final static Map<Integer,String> SORT_OPTIONS;

    public final static Map<Integer,String[]>SORT_CONDITIONS;

    static{
        SORT_OPTIONS = new HashMap<>();
        SORT_OPTIONS.put(1, "Price: Low to High");
        SORT_OPTIONS.put(2, "Price: High to Low");
        SORT_OPTIONS.put(3, "Date: Oldest First");
        SORT_OPTIONS.put(4, "Date: Newest First");
        SORT_OPTIONS.put(5, "Rating: Low to High");
        SORT_OPTIONS.put(6, "Rating: High to Low");

        SORT_CONDITIONS=new HashMap<>();
        SORT_CONDITIONS.put(1, new String[]{"price","asc"});
        SORT_CONDITIONS.put(2,new String[]{"price","desc"});
        SORT_CONDITIONS.put(3,new String[]{"createdAt","asc"});
        SORT_CONDITIONS.put(4,new String[]{"createdAt","desc"});
        SORT_CONDITIONS.put(5,new String[]{"rating","asc"});
        SORT_CONDITIONS.put(6,new String[]{"rating","desc"});
    }
}
