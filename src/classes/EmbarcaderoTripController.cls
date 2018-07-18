Global with sharing class EmbarcaderoTripController {
    
    private class Config{
        private String sessionId;
        private String baseUrl;
    }

    @RemoteAction
    public static Config getConfig(){
        Config initConfig = new Config();
        initConfig.sessionId = UserInfo.getSessionId();
        initConfig.baseUrl = System.Url.getSalesforceBaseURL().toExternalForm();
        return initConfig;
    }

    @RemoteAction
    public static List<AggregateResult> getAggregatedBikeMetrics(String bikeId){
        return [SELECT Start_Date__c, SUM(Duration__c) FROM Trip__c WHERE Bike_ID__c =: bikeId GROUP BY Start_Date__c order by Start_Date__c ASC];
    }
}