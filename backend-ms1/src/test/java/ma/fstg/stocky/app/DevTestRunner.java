package ma.peps.sqli.app;

import com.intuit.karate.junit5.Karate;
import org.junit.jupiter.api.BeforeAll;


public class DevTestRunner {


    @BeforeAll
    public static void beforeAll() {
        System.setProperty("karate.env", "dev");
    }

    @Karate.Test
    Karate InfoAppTest() {
        return Karate.run("test/AppStatusTest").relativeTo(getClass());
    }



}
