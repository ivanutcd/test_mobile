// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace utcd.cobro_prejuridico.Api.Plumbing.Core;

public class QueueSetting
{

    public const string ConfigurationSectionName = "QUEUE";


    [ConfigurationKeyName("SERVER")]
    public string Server { get; set; }

    [ConfigurationKeyName("USER")]
    public string User { get; set; }

    [ConfigurationKeyName("PASSWORD")]
    public string Password { get; set; }

    [ConfigurationKeyName("DISABLED")]
    public bool Disabled { get; set; }


}
